// require("dotenv").config()
const bcrypt = require('bcrypt')
const { validationResult, matchedData } = require('express-validator')
const uuid = require('uuid')

const mailHandler = require('../handler/mailHandler')
const users = require('../models/userModel')
const { createUserSlug } = require('../utils/handleSlug')
const hlp = require('../helpers')

/** Helpers */
const { cleanDate } = require('../utils/handleDates')

/** Logics Start */
exports.register = async (req, res) => {
    try {
        const data = matchedData(req)

        /** verificar se usuario ja existe*/
        const user = await users.findOne({ email: data.email })
        if (user) {
            return res.json({ status: 'error', msg: 'Email already exists' })
        }

        /** Cria um slug e verifica se ja existe*/
        const slug = await createUserSlug(data.name)

        /** criar hash de senha e token criptografados */
        const hash = await bcrypt.hash(data.password, 10)
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        /** Cria um token para confirmação do email */
        const emailTokenVerification = `${uuid.v4()}-${uuid.v4()}`

        //salvar dados no banco de dados
        const newUser = new users({
            email: data.email,
            emailTokenVerification,
            profilePicture: '',
            name: data.name,
            slug: slug,
            birth: '1970/01/25',
            situation: '',
            local: '',
            city: '',
            state: '',
            country: '',
            bio: `@${data.name}`,
            linkedin: '',
            github: '',
            youtube: '',
            instagram: '',
            twitter: '',
            portfoliosAmount: 0,
            knowledge: [],
            stars: [],

            joined: Date.now(),
            hash,
            token,
            tokenExpirationDate: Date.now() + 43200000 // 43200000 = 12h
        })
        await newUser.save()

        /** Cria um link para confirmar o email */
        const urlDomain = hlp.FRONTEND_HOST
        const link = `${urlDomain}/confirm-email/${emailTokenVerification}`

        /** Html para criar pagina personalizada no email */
        const html = `<h1>Confirm email:</h1> <br/><a href="${link}">Click here </a>`

        /** Envia o link para o email do solicitante */
        try {
            await mailHandler.send({
                to: `${newUser.name} <${newUser.email}>`,
                subject: 'Confirm email',
                html,
                text: `Confirm email: ${link}`
            })
        } catch (error) {
            console.log(error.message)
            return res.json({ status: 'error', msg: 'In server' })
        }

        /** Retorna uma data visualmente mais bonita */
        const dateFormated = cleanDate(newUser.birth)

        return res.json({
            status: 'success',
            msg: 'success',
            accessToken: token,
            tokenExpirationDate: newUser.tokenExpirationDate,
            user: {
                id: newUser._id,
                email: newUser.email,
                emailVerification: false,
                name: newUser.name,
                slug: newUser.slug,
                profilePicture: newUser.profilePicture,
                birth: dateFormated.date,
                situation: newUser.situation,
                local: newUser.local,
                city: newUser.city,
                state: newUser.state,
                country: newUser.country,
                bio: newUser.bio,
                linkedin: newUser.linkedin,
                github: newUser.github,
                youtube: newUser.youtube,
                instagram: newUser.instagram,
                twitter: newUser.twitter,
                stars: []
            }
        })
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.login = async (req, res) => {
    try {
        const data = matchedData(req)

        /**Verifica se o email existe */
        const user = await users
            .findOne({ email: data.email })
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
            return res.json({
                status: 'error',
                msg: 'Wrong email or password'
            })
        }

        /** Retorna uma data visualmente mais bonita */
        const dateFormated = cleanDate(user.birth)
        console.log(dateFormated)

        /** Verifica se a senha bate com a hash do email */
        const match = await bcrypt.compare(data.password, user.hash)
        if (!match) {
            return res.json({
                status: 'error',
                msg: 'Wrong email or password'
            })
        }

        /** Se a senha estiver correta então criamos um novo token de acesso */
        const payload = (Date.now() + Math.random()).toString()
        const token = await bcrypt.hash(payload, 10)

        /** Atualiza o token do usuario no banco de dados e a data de expiração*/
        user.token = token
        user.tokenExpirationDate = Date.now() + 43200000 // 43200000 = 12h
        await user.save()

        /** Se tiver tudo certo então retorna o email e token para serem usado no app */
        return res.json({
            status: 'success',
            msg: 'success',
            accessToken: token,
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
        console.log('Catch error', error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.checkTokenValidity = async (req, res) => {
    /** Pega o usuario que fez a requisição*/
    const user = await users.findOne({ token: req.token })
    if (!user) {
        removeMultiImages(files)
        return res.json({ status: 'error', msg: 'Invalid token' })
    }
}

exports.recoverPassword = async (req, res) => {
    try {
        /** Valida os campos da requisição */
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ status: 'error', msg: errors.mapped() })
        }
        const data = matchedData(req)

        /** Verifica se o email corresponde a algum usuario*/
        const user = await users.findOne({ email: data.email })
        if (!user) {
            return res.json({ status: 'error', msg: 'Email not found' })
        }
        /** Cria um token de redefinição de senha */
        const recoveryToken = `${uuid.v4()}-${uuid.v4()}`

        /** Cria uma data de expiração para o token de redefinição de senha */
        const recoveryTokenExpiration = Date.now() + 3600000 // 3600000 = 1h

        /** Atualiza o usuario com os novos dados para a recuperação de senha */
        user.passwordRecoveryToken = recoveryToken
        user.passwordRecoveryTokenExpiration = recoveryTokenExpiration
        user.save()

        /** Cria um link para rederinir a senha */
        const urlDomain = hlp.FRONTEND_HOST
        const link = `${urlDomain}/recover-password/${user.passwordRecoveryToken}`

        /** Html para criar pagina personalizada no email */
        const html = `<h1>Recover password:</h1> <br/><a href="${link}">Click here </a>`

        /** Envia o link para o email do solicitante */
        try {
            await mailHandler.send({
                to: `${user.name} <${user.email}>`,
                subject: 'Recover password',
                html,
                text: `Recover password: ${link}`
            })
        } catch (error) {
            console.log(error.message)
            return res.json({ status: 'error', msg: 'In server' })
        }

        /** Se chegou até aqui então tudo ocorreu bem */
        console.log('Recover password:', data.email)
        return res.json({ status: 'success', msg: 'Email sent' })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.recoverNewPassword = async (req, res) => {
    try {
        /**validação de "escrita de dados"*/
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ status: 'error', msg: errors.mapped() })
        }
        const data = matchedData(req)

        /** Verifica se tem token no parametro da URL */
        if (!req.params.token) {
            return res.json({ status: 'error', msg: 'Token ir required' })
        }
        const recoveryToken = req.params.token

        /** Procura por algum usuario que tenha esse token para redefinir senha */
        const user = await users.findOne({
            passwordRecoveryToken: recoveryToken
        })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Se a data do token for menor que a atual então já ta expirado */
        if (user.passwordRecoveryTokenExpiration < Date.now()) {
            return res.json({ status: 'error', msg: 'Expired token' })
        }

        /** Verifica se o token já foi usado */
        if (user.passwordRecoveryTokenUsage === true) {
            return res.json({ status: 'error', msg: 'Token already used' })
        }

        /** Gera uma nova hash de senha e atualiza o BD */
        const newHash = await bcrypt.hash(data.password, 10)
        user.hash = newHash
        user.passwordRecoveryTokenUsage = true
        await user.save()

        /** Return if ok */
        console.log('Recover password, set new password:', user.name)
        return res.json({ status: 'success', msg: 'New password set' })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.logout = async (req, res) => {
    try {
        /** Pega o usuario que fez a requisição*/
        const user = await users.findOne({ token: req.token })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        /** Gera um token invalido e substitui o atual, invalidando
         * qualquer futura requisição dessa conta. Será necessario um
         * novo login.*/
        const tokenOff = Date.now()
        user.token = 'OFF_' + tokenOff
        await user.save()

        /** Fim */
        return res.json({ status: 'success', msg: 'success' })
    } catch (error) {
        return res.json({ status: 'error', msg: 'Server error' })
    }
}

exports.confirmEmail = async (req, res) => {
    try {
        /** Verifica se tem token no parametro da URL */
        if (!req.params.token) {
            return res.json({ status: 'error', msg: 'Token ir required' })
        }
        const tokenConfirmation = req.params.token

        /** Procura por algum usuario que tenha esse token para redefinir senha */
        const user = await users.findOne({
            emailTokenVerification: tokenConfirmation
        })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid token' })
        }

        if (user.emailVerification == true) {
            return res.json({
                status: 'success',
                msg: 'Email already confirmed'
            })
        }

        /** Atualiza status e salva no BD */
        user.emailVerification = true
        await user.save()

        /** Html para criar pagina personalizada no email */
        const html = `<h1>Congratulations, your email has been confirmed.</h1>`

        /** Envia o link para o email do solicitante */
        try {
            await mailHandler.send({
                to: `${user.name} <${user.email}>`,
                subject: 'Email confirmed',
                html,
                text: `Congratulations, your email has been confirmed.`
            })
        } catch (error) {
            console.log(error.message)
            return res.json({ status: 'error', msg: 'In server' })
        }

        /** Return if ok */
        console.log('Confirm email:', user.email)
        return res.json({ status: 'success', msg: 'Confirmed email' })
    } catch (error) {
        console.log(error.message)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}
