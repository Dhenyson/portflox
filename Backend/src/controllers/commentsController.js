const comments = require('../models/commentModel')
const users = require('../models/userModel')
const portfolios = require('../models/portfolioModel')

const { matchedData } = require('express-validator')

exports.post = async (req, res) => {
    try {
        /** pega os dados que passaram na validação de dados */
        const data = matchedData(req)

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Pega o portfolio especifico */
        const targetPortfolio = await portfolios.findOne({
            _id: data.portfolioID
        })

        /** Verifica se encontrou portfolio com o ID informado */
        if (!targetPortfolio) {
            return res.json({ status: 'error', msg: 'Portfolio not found' })
        }

        /** Cria um objeto com todos os dados para o commentario */
        const comment = new comments({
            portfolioID: targetPortfolio._id,
            author: user._id,
            content: data.content,
            creationDate: Date.now(),
            editDate: Date.now(),
            oldContents: [],
            answers: [],
            likes: [],
            dislikes: []
        })
        await comment.save()

        /** Updates the number of comments in the portfolio */
        targetPortfolio.commentsAmount = targetPortfolio.commentsAmount + 1
        await targetPortfolio.save()

        return res.json({
            status: 'success',
            msg: 'New comment added',
            comment
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.delete = async (req, res) => {
    try {
        /** pega os dados que passaram na validação de dados */
        const data = matchedData(req)

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'User not found' })
        }

        /** Pega o comentario especifico */
        const targetComment = await comments.findOne({ _id: data.commentID })
        if (!targetComment) {
            return res.json({ status: 'error', msg: 'Comment not found' })
        }

        /** Get the spific portfolio */
        const targetPortfolio = await portfolios.findOne({
            _id: targetComment.portfolioID
        })
        if (!targetPortfolio) {
            return res.json({ status: 'error', msg: 'Portfolio not found' })
        }

        /** Verifica se o comentario pertence ao usuairo da requisição */
        if (targetComment.author.toString() != user._id.toString()) {
            return res.json({
                status: 'error',
                msg: 'You do not have permission to delete this comment.'
            })
        }

        await targetComment.delete()

        /** Updates the number of comments in the portfolio */
        targetPortfolio.commentsAmount = targetPortfolio.commentsAmount - 1
        await targetPortfolio.save()

        return res.json({ status: 'success', msg: 'Comment deleted' })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.edit = async (req, res) => {
    try {
        /** Get the validated data */
        const data = matchedData(req)

        /** Get the user who made the request */
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'User not found' })
        }

        /** Get the target comment */
        const comment = await comments.findOne({ _id: data.commentID })
        if (!comment) {
            return res.json({ status: 'error', msg: 'Comment not found' })
        }

        /** Check if the requester is the author of the comment */
        if (comment.author.toString() != user._id.toString()) {
            return res.json({
                status: 'error',
                msg: 'This comment is not yours.'
            })
        }

        /** Check if the new content is different */
        if (data.content == comment.content) {
            return res.json({
                status: 'error',
                msg: 'There were no changes in content'
            })
        }

        /** Data update */
        comment.oldContents.push({
            oldContent: comment.content,
            date: Date.now()
        })
        comment.content = data.content
        comment.editDate = Date.now()
        await comment.save()

        /** End of code */
        return res.json({
            status: 'success',
            msg: 'The comment has been edited'
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.like = async (req, res) => {
    try {
        /** pega os dados que passaram na validação de dados */
        const data = matchedData(req)

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'User not found' })
        }

        /** Pega o comentario especifico */
        const targetComment = await comments.findOne({ _id: data.commentID })
        if (!targetComment) {
            return res.json({ status: 'error', msg: 'Comment not found' })
        }

        /** Make a 'map' on dislike and remove if there is already the user id */
        if (targetComment.likes.includes(user._id.toString())) {
            targetComment.likes.splice(
                targetComment.likes.indexOf(user._id.toString()),
                1
            )
        } else {
            targetComment.likes.push(user._id)
            if (targetComment.dislikes.includes(user._id.toString())) {
                targetComment.dislikes.splice(
                    targetComment.dislikes.indexOf(user._id.toString()),
                    1
                )
            }
        }

        /** Save new data after updates */
        await targetComment.save()

        /** Fim do codigo se tudo ocorrer bem */
        return res.json({ status: 'success', msg: 'success' })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.dislike = async (req, res) => {
    try {
        /** pega os dados que passaram na validação de dados */
        const data = matchedData(req)

        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'User not found' })
        }

        /** Pega o comentario especifico */
        const targetComment = await comments.findOne({ _id: data.commentID })
        if (!targetComment) {
            return res.json({ status: 'error', msg: 'Comment not found' })
        }

        /** Make a 'map' on dislike and remove if there is already the user id */
        if (targetComment.dislikes.includes(user._id.toString())) {
            targetComment.dislikes.splice(
                targetComment.dislikes.indexOf(user._id.toString()),
                1
            )
        } else {
            targetComment.dislikes.push(user._id)
            if (targetComment.likes.includes(user._id.toString())) {
                targetComment.likes.splice(
                    targetComment.likes.indexOf(user._id.toString()),
                    1
                )
            }
        }

        /** Save new data after updates */
        await targetComment.save()

        /** Fim do codigo se tudo ocorrer bem */
        return res.json({ status: 'success', msg: 'success' })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.get = async (req, res) => {
    try {
        /** Get portfolioSlug */
        const portfolioSlug = req.params.portfolioSlug

        /** Check if there is this portfolio */
        const targetPortfolio = await portfolios.findOne({
            slug: portfolioSlug
        })
        if (!targetPortfolio) {
            return res.json({ status: 'error', msg: 'Porfolio not found' })
        }

        /** Get comments by portfolioID */
        const targetComments = await comments
            .find({ portfolioID: targetPortfolio._id })
            .select(['-__v'])
            .populate('author', [
                '_id',
                'name',
                'slug',
                'profilePicture',
                'city',
                'state',
                'country',
                'portfolios',
                'stars'
            ])

        return res.json({
            status: 'success',
            msg: 'Success',
            comments: targetComments
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}
