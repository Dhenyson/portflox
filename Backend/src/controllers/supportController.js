const support = require('../models/supportModel')
const users = require('../models/userModel')

const { matchedData } = require('express-validator')
const mailHandler = require('../handler/mailHandler')

exports.support = async (req, res) => {
    try {
        /** Pega os dados validados pelo express validator */
        const data = matchedData(req)

        /** Pega o usuario que fez a requisiçao */
        const user = await users.findOne({ token: req.token })
        if (!user) {
            res.json({ status: 'error', msg: 'User not found' })
        }

        /** Verifica se tem informações extra, caso contrario retorna empty */
        let extra = ''
        if (data.extra.length > 1) {
            extra = data.extra
        }

        /** Cria um novo documento de suporte */
        let newSupport = new support({
            requester: user._id,
            type: data.type,
            content: data.content,
            extra: extra
        })
        await newSupport.save()

        /** Envia um email informando que obteve contato */
        const html = `<h1>Obrigado por entrar em contato</h1>`
        await mailHandler.send({
            to: `${user.name} <${user.email}>`,
            subject: `Portflox Support [${data.type}]`,
            html,
            text: `Obrigado por entrar em contato`
        })

        /** Envia um email para o email de suporte */
        const html2 = `
        <h3><b>Support ID:</b> ${newSupport._id}</h3>
        <hr/>
        <p><b>Requester ID:</b> ${user._id} </p>
        <p><b>Requester info:</b> ${user.name} | ${user.city},${user.state}-${user.country}</p>
        <hr/>
        <p><b>Content:</b> ${newSupport.content}</p>
        <p><b>Extra:</b> ${newSupport.extra}</p>`

        await mailHandler.send({
            to: `Support <support@portflox.com>`,
            subject: `Portflox Support [${data.type}]`,
            html: html2,
            text: `Support request. ID: ${newSupport._id}`
        })

        /** Se tudo ocorreu bem */
        return res.json({ status: 'success', msg: 'Success' })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', msg: 'Server error' })
    }
}
