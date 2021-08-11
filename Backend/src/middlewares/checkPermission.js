const Users = require('../models/userModel')

module.exports.private = async (req, res, next) => {
    try {
        /** Verifica se há token em alguma requisição */
        if (!req.query.token && !req.body.token) {
            return res.json({
                status: 'error',
                msg: 'Login is required'
            })
        }

        /** Se tiver token vai procurar em qual requisição
         * e colocar numa variavel */
        let token = ''
        if (req.query.token) {
            token = req.query.token
        }
        if (req.body.token) {
            token = req.body.token
        }
        if (token === '') {
            return res.json({
                status: 'error',
                msg: 'Login is required'
            })
        }

        /** Token não pode ser menor que 50 ou maior que 100*/
        if (token.length < 50 || token.length > 100) {
            return res.json({ status: 'error', msg: 'Invalid token. Length' })
        }

        /** Quando achar o token vai verificar se pertence a algum
         * usuario no banco de dados */
        const user = await Users.findOne({ token })
        if (!user) {
            return res.json({
                status: 'error',
                msg: 'Invalid token'
            })
        }

        /** Se chegar aqui então encontrou um usuario e agora vamos verificar
         * se esse token ainda é válido */
        if (user.tokenExpirationDate < Date.now()) {
            return res.json({ status: 'error', msg: 'Expired token' }) //nao mudar a msg
            /** No frontend, ações são feitas por essa string em especifico */
        }

        /** Se tudo tive ok então pulamos para o proximo codigo */
        req.token = token
        next()
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}
