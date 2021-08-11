const users = require('../models/userModel')
const { validationResult, matchedData } = require('express-validator')
const bcrypt = require('bcrypt')
const fs = require('fs')
const uuid = require('uuid')
const mailHandler = require('../handler/mailHandler')
const HLP = require('../helpers')

const { checkUserSlug } = require('../utils/handleSlug')
const { limitAge, cleanDate } = require('../utils/handleDates')

exports.getUsers = async (req, res) => {
    try {
        const allUsers = await users
            .find({})
            .select([
                '-emailVerification',
                '-tokenExpirationDate',
                '-passwordRecoveryTokenUsage',
                '-passwordRecoveryTokenExpiration',
                '-email',
                '-hash',
                '-token',
                '-__v'
            ])

        return res.json({
            status: 'success',
            msg: 'success',
            users: allUsers
        })
    } catch (error) {
        console.log(error)
        return res.json({
            status: 'error',
            msg: 'Server error'
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        /** Verifica se há um usuario com o slug informado */
        const user = await users
            .findOne({ slug: req.params.slug })
            .select([
                '-emailVerification',
                '-tokenExpirationDate',
                '-passwordRecoveryTokenUsage',
                '-passwordRecoveryTokenExpiration',
                '-email',
                '-hash',
                '-token',
                '-__v'
            ])
            .populate('stars', [
                'name',
                'slug',
                'profilePicture',
                'stars',
                'city',
                'state',
                'country',
                'portfolios',
                'bio',
                'knowledge'
            ])

        if (!user) {
            return res.json({ status: 'error', msg: 'User not found' })
        }

        /** Retorna uma data visualmente mais bonita */
        const dateFormated = cleanDate(user.birth)

        return res.json({ status: 'success', msg: 'success', user: user })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.updatePicture = async (req, res) => {
    try {
        /** Get the user data of the request  */
        const user = await users
            .findOne({ token: req.token })
            .populate('stars', [
                'name',
                'slug',
                'profilePicture',
                'stars',
                'city',
                'state',
                'country',
                'portfolios',
                'bio'
            ])

        /** Remove old picture */
        const pathFile = __dirname + '../../../public/pictures'

        fs.unlink(`${pathFile}/${user.profilePicture}`, function (err) {
            if (err) {
                console.log(err.message)
            }
            console.log(`Old picture removed: [${user._id}] ${user.name} `)
        })

        /** Atualiza o nome da imagem de perfil */
        user.profilePicture = req.file.name
        await user.save()

        /** Retorna uma data visualmente mais bonita */
        const dateFormated = cleanDate(user.birth)

        return res.json({
            status: 'success',
            msg: 'success',
            accessToken: user.token,
            tokenExpirationDate: user.tokenExpirationDate,
            user: {
                id: user._id,
                email: user.email,
                emailVerification: user.emailVerification,
                name: user.name,
                slug: user.slug,
                profilePicture: user.profilePicture,
                birth: dateFormated.date,
                situation: user.situation,
                local: user.local,
                city: user.city,
                state: user.state,
                country: user.country,
                bio: user.bio,
                linkedin: user.linkedin,
                github: user.github,
                youtube: user.youtube,
                instagram: user.instagram,
                twitter: user.twitter,
                stars: user.stars
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const data = matchedData(req)
        /** Verifica se encontra algum usuario com este token*/
        const user = await users
            .findOne({ token: req.token })
            .populate('stars', [
                'name',
                'slug',
                'profilePicture',
                'stars',
                'city',
                'state',
                'country',
                'portfolios',
                'bio'
            ])
        if (!user) {
            return res.json({ status: 'error', msg: 'Token not found' })
        }

        /** Verifica se o slug é valido */
        const formattedSlug = data.slug
            .replace(/^\s|\s{1,}/g, '-')
            .toLowerCase()
        const checkingSlug = await checkUserSlug(formattedSlug, user)
        if (checkingSlug.status == 'error') {
            return res.json({ status: 'error', msg: checkingSlug.msg })
        }

        /** Verifica se a data é valida */
        const checkingDate = await limitAge(data.birth, 130, 7)
        if (!checkingDate) {
            return res.json({
                status: 'error',
                msg: 'Invalid date. Enter your real date'
            })
        }

        /** Pega os 3 dados que pode ser alterado e atuliza o BD */
        user.name = data.name
        user.birth = data.birth
        user.situation = data.situation
        user.local = data.local
        user.city = data.city
        user.state = data.state
        user.country = data.country
        user.slug = formattedSlug
        user.bio = data.bio
        user.linkedin = data.linkedin
        user.github = data.github
        user.youtube = data.youtube
        user.instagram = data.instagram
        user.twitter = data.twitter
        await user.save()

        /** Retorna uma data visualmente mais bonita */
        const dateFormated = cleanDate(user.birth)

        /** Se chegou até aqui então deu tudo certo */
        return res.json({
            status: 'success',
            msg: 'success',
            accessToken: req.token,
            tokenExpirationDate: user.tokenExpirationDate,
            user: {
                id: user._id,
                email: user.email,
                emailVerification: user.emailVerification,
                name: user.name,
                slug: user.slug,
                profilePicture: user.profilePicture,
                birth: dateFormated.date,
                situation: user.situation,
                local: user.local,
                city: user.city,
                state: user.state,
                country: user.country,
                bio: user.bio,
                linkedin: user.linkedin,
                github: user.github,
                youtube: user.youtube,
                instagram: user.instagram,
                twitter: user.twitter,
                stars: user.stars
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        /** Validação do conteudo enviado */
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ status: 'error', msg: errors.mapped() })
        }
        const data = matchedData(req)

        /** procura pelo usuario que fez a requisição */
        const user = await users
            .findOne({ token: req.token })
            .populate('stars', [
                'name',
                'slug',
                'profilePicture',
                'stars',
                'city',
                'state',
                'country',
                'portfolios',
                'bio'
            ])
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Verifica se a senha atual descriptografa a hash */
        const match = await bcrypt.compare(data.currentPassword, user.hash)
        if (!match) {
            return res.json({ status: 'error', msg: 'Wrong password' })
        }

        /** cria uma nova hash de senha e atualiza o DB */
        const newHash = await bcrypt.hash(data.newPassword, 10)

        /** Cria um novo token, para o login ser obrigatorio, assim desloga
         * os usuarios que estavam logados com a senha antiga.*/
        const payload = (Date.now() + Math.random()).toString()
        const newToken = await bcrypt.hash(payload, 10)

        /** Retorna uma data visualmente mais bonita */
        const dateFormated = cleanDate(user.birth)

        /** Salva o novo token e nova senha */
        user.hash = newHash
        user.token = newToken
        user.tokenExpirationDate = Date.now() + 43200000 // 43200000 = 12h
        await user.save()

        /** Se chegou até aqui então deu tudo certo */
        console.log('Change password:', user.name)
        return res.json({
            status: 'success',
            msg: 'success',
            accessToken: newToken,
            tokenExpirationDate: Date.now() + 43200000, // 43200000 = 12h
            user: {
                id: user._id,
                email: user.email,
                emailVerification: user.emailVerification,
                name: user.name,
                slug: user.slug,
                profilePicture: user.profilePicture,
                birth: dateFormated.date,
                situation: user.situation,
                local: user.local,
                city: user.city,
                state: user.state,
                country: user.country,
                bio: user.bio,
                linkedin: user.linkedin,
                github: user.github,
                youtube: user.youtube,
                instagram: user.instagram,
                twitter: user.twitter,
                stars: user.stars
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.updateEmail = async (req, res) => {
    try {
        /** Get data validated */
        const data = matchedData(req)

        /** procura pelo usuario que fez a requisição */
        const user = await users
            .findOne({ token: req.token })
            .populate('stars', [
                'name',
                'slug',
                'profilePicture',
                'stars',
                'city',
                'state',
                'country',
                'portfolios',
                'bio'
            ])
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Verifica se a senha atual descriptografa a hash */
        const match = await bcrypt.compare(data.password, user.hash)
        if (!match) {
            return res.json({ status: 'error', msg: 'Wrong password' })
        }

        /** Cria um novo token, para o login ser obrigatorio, assim desloga
         * os usuarios que estavam logados com o email antigo.*/
        const payload = (Date.now() + Math.random()).toString()
        const newToken = await bcrypt.hash(payload, 10)

        /** Retorna uma data visualmente mais bonita */
        const dateFormated = cleanDate(user.birth)

        /** Cria um token para confirmação do email */
        const emailTokenVerification = `${uuid.v4()}-${uuid.v4()}`

        /** Salva o novo token and new email*/
        user.token = newToken
        user.tokenExpirationDate = Date.now() + 43200000 // 43200000 = 12h
        user.email = data.newEmail
        user.emailVerification = false
        user.emailTokenVerification = emailTokenVerification
        await user.save()

        /** Cria um link para confirmar o novo email */
        const urlDomain = HLP.FRONTEND_HOST
        const link = `${urlDomain}/confirm-email/${emailTokenVerification}`

        /** Html para criar pagina personalizada no email */
        const html = `<h1>Confirm email:</h1> <br/><a href="${link}">Click here </a>`

        /** Envia o link para o email do solicitante */
        try {
            await mailHandler.send({
                to: `${user.name} <${user.email}>`,
                subject: 'Confirm email',
                html,
                text: `Confirm email: ${link}`
            })
        } catch (error) {
            console.log(error.message)
            return res.json({ status: 'error', msg: 'Server error' })
        }

        /** Se chegou até aqui então deu tudo certo */
        console.log('Change email:', user.email)
        return res.json({
            status: 'success',
            msg: 'Email changed',
            accessToken: newToken,
            tokenExpirationDate: Date.now() + 43200000, // 43200000 = 12h
            user: {
                id: user._id,
                email: user.email,
                emailVerification: false,
                name: user.name,
                slug: user.slug,
                profilePicture: user.profilePicture,
                birth: dateFormated.date,
                situation: user.situation,
                local: user.local,
                city: user.city,
                state: user.state,
                country: user.country,
                bio: user.bio,
                linkedin: user.linkedin,
                github: user.github,
                youtube: user.youtube,
                instagram: user.instagram,
                twitter: user.twitter,
                stars: user.stars
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}
exports.resendEmailConfirmLink = async (req, res) => {
    try {
        /** procura pelo usuario que fez a requisição */
        const user = await users
            .findOne({ token: req.token })
            .populate('stars', [
                'name',
                'slug',
                'profilePicture',
                'stars',
                'city',
                'state',
                'country',
                'portfolios',
                'bio'
            ])
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Cria um link para confirmar o novo email */
        const urlDomain = HLP.FRONTEND_HOST
        const link = `${urlDomain}/confirm-email/${user.emailTokenVerification}`

        /** Html para criar pagina personalizada no email */
        const html = `<h1>Confirm email:</h1> <br/><a href="${link}">Click here </a>`

        /** Envia o link para o email do solicitante */
        try {
            await mailHandler.send({
                to: `${user.name} <${user.email}>`,
                subject: 'Confirm email',
                html,
                text: `Confirm email: ${link}`
            })
        } catch (error) {
            console.log(error.message)
            return res.json({ status: 'error', msg: 'Server error' })
        }

        /** Se chegou até aqui então deu tudo certo */
        console.log('Resend confirm email link:', user.email)
        return res.json({
            status: 'success',
            msg: 'Email sent'
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.star = async (req, res) => {
    try {
        const data = matchedData(req)

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Rejeita se o target da star é o mesmo que solicitou */
        if (data.targetSlug == user.slug) {
            return res.json({
                status: 'error',
                msg: 'You can"t give yourself a star'
            })
        }

        /** Procura o usuario target pelo id */
        const userTarget = await users.findOne({ slug: data.targetSlug })
        if (!userTarget) {
            return res.json({ status: 'error', msg: 'Invalid target ID' })
        }

        /** Faz a alternção do like, se o id já esta na lista então remove,
         * se não tiver então é adicionado.*/
        var action = 'Starred'
        if (userTarget.stars.includes(user._id)) {
            action = 'un-starred'
            userTarget.stars.splice(
                userTarget.stars.indexOf(user._id.toString()),
                1
            )
        } else {
            userTarget.stars.push(user._id)
        }

        await userTarget.save()

        return res.json({ status: 'success', msg: action })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}
