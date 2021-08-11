const { matchedData } = require('express-validator')
const users = require('../models/userModel')
const portfolios = require('../models/portfolioModel')
const ObjectId = require('mongoose').Types.ObjectId
const {
    removeMultiImages,
    removeAllImagesPortfolio,
    removeMultiImagesByEdit
} = require('../helpers/removeImages')
const { createPortfolioSlug } = require('../utils/handleSlug')

exports.add = async (req, res) => {
    try {
        /** pega os dados verificados pelo validator */
        const data = matchedData(req)
        const files = req.files

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            removeMultiImages(files)
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Cria um array com o nome de todas imagens desse portfolio */
        const images = []
        if (req.files.length > 0) {
            req.files.map((item, index) => {
                images.push(item.filename)
            })
        }

        /** Create slug */
        let titleFilter = data.title
            .replace(/[^\a-zA-Z\s0-9áàâãéèêíìïóôõÒöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, '')
            .replace(/^\s{1,}/g, '')
            .replace(/\s{2,}/g, ' ')
        const slug = await createPortfolioSlug(titleFilter)

        const tags = data.tags
            .toLowerCase()
            .replace(/^\s/g, '') //remove spaces in start
            .replace(/\s$/g, '') //remove spaces in end
            .replace(/\s{1,}/g, ' ') //1 spare or more convert in 1 space
            .replace(/,\s/g, ',') //remove space after ,
            .split(',')

        /** Handle user knowledge */
        let knowledge = user.knowledge ? [...user.knowledge] : []
        if (data.category == 'work' || data.category == 'service') {
            for (let i = 0; i < tags.length; i++) {
                let status = false
                for (let y = 0; y < knowledge.length; y++) {
                    if (tags[i] == knowledge[y].text) {
                        knowledge[y].count = knowledge[y].count + 1
                        status = true
                    }
                }
                if (!status) {
                    knowledge.push({ text: tags[i], count: 1 })
                }
            }
        }

        /** Salva o novo portfolio */
        const newPortfolio = new portfolios({
            author: user._id,
            title: data.title,
            slug: slug,
            description: data.description,
            body: data.body,
            category: data.category,
            images: images,
            updateDate: Date.now(),
            creationDate: Date.now(),
            tags: tags,
            likes: [],
            commentsAmount: 0
        })
        await newPortfolio.save()

        /** Icrement new portfolio in the user account */
        user.portfoliosAmount = user.portfoliosAmount + 1
        user.knowledge = []
        user.knowledge = [...knowledge]
        await user.save()

        return res.json({
            status: 'success',
            msg: 'The new portfolio has been added',
            slug,
            _id: newPortfolio.id
        })
    } catch (error) {
        console.log(error)

        removeMultiImages(files)

        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.getAll = async (req, res) => {
    try {
        /** Pega todos portfolios */
        const portfoliosFound = await portfolios
            .find()
            .select(['-__v'])
            .populate('author', [
                'name',
                'slug',
                'profilePicture',
                'city',
                'state',
                'country',
                'portfoliosAmount',
                'stars'
            ])

        return res.json({
            status: 'success',
            msg: 'success',
            portfolios: portfoliosFound
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.getOne = async (req, res) => {
    try {
        /** Search portfolio by slug */
        const portfolioFound = await portfolios
            .findOne({ slug: req.params.slug })
            .select(['-__v'])
            .populate('author', [
                'name',
                'slug',
                'profilePicture',
                'city',
                'state',
                'country',
                'portfoliosAmount',
                'stars'
            ])

        if (!portfolioFound) {
            return res.json({ status: 'error', msg: 'Portfolio not found' })
        }

        return res.json({
            status: 'success',
            msg: 'success',
            portfolio: portfolioFound
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.getByUser = async (req, res) => {
    try {
        /** Procura o usuario correspondente ao slug */
        const user = await users.findOne({ slug: req.params.slug })
        if (!user) {
            return res.json({ status: 'error', msg: 'User not found' })
        }

        /** Pega todos portfolios do usuario */
        const portfoliosList = await portfolios
            .find({ author: user._id })
            .select(['-__v'])
            .populate('author', [
                'name',
                'slug',
                'profilePicture',
                'city',
                'state',
                'country',
                'portfoliosAmount',
                'stars'
            ])

        return res.json({
            status: 'success',
            msg: 'success',
            portfolios: portfoliosList
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.edit = async (req, res) => {
    try {
        /** pega os dados verificado pelo validator */
        const data = matchedData(req)

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Get images */
        const files = req.files

        /** Pega o portfolio especifico */
        const targetPortfolio = await portfolios.findOne({
            _id: data.portfolioID
        })
        if (!targetPortfolio) {
            removeMultiImages(files)
            return res.json({ status: 'error', msg: 'Invalid Portfolio ID' })
        }

        /** Rejects the edit if the user is not the owner of the portfolio */
        if (user._id.toString() !== targetPortfolio.author.toString()) {
            removeMultiImages(files)
            return res.json({
                status: 'error',
                msg: 'You are not allowed to change this portfolio'
            })
        }

        /** Save old image names */
        const oldImages = targetPortfolio.images

        /** Cria um array com o nome de todas imagens desse portfolio */
        const images = []
        if (req.files.length > 0) {
            req.files.map(item => {
                images.push(item.filename)
            })
        }

        /** Handle slug */
        let slug = targetPortfolio.slug
        if (targetPortfolio.title != data.title) {
            /** Create slug */
            let titleFilter = data.title
                .replace(
                    /[^\a-zA-Z\s0-9áàâãéèêíìïóôõÒöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g,
                    ''
                )
                .replace(/^\s{1,}/g, '')
                .replace(/\s{2,}/g, ' ')
            slug = await createPortfolioSlug(titleFilter)
        }

        /** Handle Tags */
        const tags = data.tags
            .toLowerCase()
            .replace(/^\s/g, '') //remove spaces in start
            .replace(/\s$/g, '') //remove spaces in end
            .replace(/\s{1,}/g, ' ') //1 spare or more convert in 1 space
            .replace(/,\s/g, ',') //remove space after ,
            .split(',')

        /** Decrement count tag in user document or delete knowledge if <= 0 */
        let knowledge = user.knowledge ? [...user.knowledge] : []
        if (
            targetPortfolio.category == 'work' ||
            targetPortfolio.category == 'service'
        ) {
            for (let i = 0; i < targetPortfolio.tags.length; i++) {
                for (let y = 0; y < knowledge.length; y++) {
                    if (targetPortfolio.tags[i] == knowledge[y].text) {
                        knowledge[y].count = knowledge[y].count - 1
                    }
                    if (knowledge[y].count <= 0) {
                        knowledge.splice(y, 1)
                    }
                }
            }
        }

        /** Handle user knowledge */
        if (data.category == 'work' || data.category == 'service') {
            for (let i = 0; i < tags.length; i++) {
                let status = false
                for (let y = 0; y < knowledge.length; y++) {
                    if (tags[i] == knowledge[y].text) {
                        knowledge[y].count = knowledge[y].count + 1
                        status = true
                    }
                }
                if (!status) {
                    knowledge.push({ text: tags[i], count: 1 })
                }
            }
        }

        /** Salva o novo portfolio */
        targetPortfolio.category = data.category
        targetPortfolio.title = data.title
        targetPortfolio.tags = tags
        targetPortfolio.description = data.description
        targetPortfolio.body = data.body
        targetPortfolio.images = images
        targetPortfolio.updateDate = Date.now()
        targetPortfolio.slug = slug
        targetPortfolio.knowledge = knowledge
        await targetPortfolio.save()

        user.knowledge = []
        user.knowledge = knowledge
        await user.save()

        /** If everything is OK, delete old images*/
        removeMultiImagesByEdit(oldImages)

        /** Fim do codigo, se tudo deu certo */
        return res.json({ status: 'success', msg: 'Portfolio Edited', slug })
    } catch (error) {
        let files2 = req.files
        removeMultiImages(files2)
        console.log(error)
        return res.json({ status: 'error', msg: error.message })
    }
}

exports.delete = async (req, res) => {
    try {
        /** pega os dados verificado pelo validator */
        const data = matchedData(req)

        /** Procura o usuario que fez a requisição */
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid Token' })
        }

        /** Verifica se é um ObjectID valido */
        if (!ObjectId.isValid(data.portfolioID)) {
            return res.json({ status: 'error', msg: 'Invalid Portfolio ID' })
        }

        /** Verifica se existe um portfolio com este ID */
        const targetPortfolio = await portfolios.findOne({
            _id: data.portfolioID
        })
        if (!targetPortfolio) {
            return res.json({ status: 'error', msg: 'Invalid Portfolio ID' })
        }

        /** Compara se o solicitante é o proprietario do portfolio */
        if (user._id.toString() !== targetPortfolio.author.toString()) {
            return res.json({
                status: 'error',
                msg: 'You are not allowed to delete this portfolio'
            })
        }

        /** Deleta o item encontrado e as imagens do banco de dados*/
        await targetPortfolio.delete()
        removeAllImagesPortfolio(targetPortfolio.images)

        /** Decrement count tag in user knowledge document or delete tag if <= 0 */
        let knowledge = user.knowledge ? [...user.knowledge] : []
        if (
            targetPortfolio.category == 'work' ||
            targetPortfolio.category == 'service'
        ) {
            for (let i = 0; i < targetPortfolio.tags.length; i++) {
                for (let y = 0; y < knowledge.length; y++) {
                    if (targetPortfolio.tags[i] == knowledge[y].text) {
                        knowledge[y].count = knowledge[y].count - 1
                    }
                    if (knowledge[y].count <= 0) {
                        knowledge.splice(y, 1)
                    }
                }
            }
        }

        /** Icrement new portfolio */
        user.portfoliosAmount = user.portfoliosAmount - 1
        user.knowledge = []
        user.knowledge = knowledge
        await user.save()

        /** Fim do codigo se tudo ocorreu bem */
        return res.json({ status: 'success', msg: 'success' })
    } catch (error) {
        return res.json({ status: 'error', msg: error.message })
    }
}

exports.likeDislikePortfolio = async (req, res) => {
    try {
        /** pega os dados que passaram na validação de dados */
        const data = matchedData(req)

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Verifica se o ID informado é um objectID do mongoose valido */
        if (!ObjectId.isValid(data.portfolioID)) {
            return res.json({ status: 'error', msg: 'Invalid Portfolio ID' })
        }

        /** Pega o portfolio especifico */
        const targetPortfolio = await portfolios.findOne({
            _id: data.portfolioID
        })

        /** Verifica se encontrou portfolio com o ID informado */
        if (!targetPortfolio) {
            return res.json({ status: 'error', msg: 'Invalid Portfolio ID' })
        }

        /** verifica se o ID do usuario ja esta na lista de likes, se tiver
         * então ele remove o like, se nao tiver ele coloca o like */
        if (targetPortfolio.likes.includes(user._id.toString())) {
            targetPortfolio.likes.splice(
                targetPortfolio.likes.indexOf(user._id.toString()),
                1
            )
        } else {
            targetPortfolio.likes.push(user._id.toString())
        }

        /** Salva para atualizar o portfolio */
        await targetPortfolio.save()

        /** Fim do codigo se tudo ocorreu bem */
        return res.json({ status: 'success', msg: 'success' })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: error.message })
    }
}
