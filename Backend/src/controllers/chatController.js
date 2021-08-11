const mongoose = require('mongoose')

const chat = require('../models/chatModel')
const Users = require('../models/userModel')

module.exports.getChat = async (req, res) => {
    let chatMessages = await chat.find()
    res.json({ chatMessages })
}

module.exports.postChat = async (req, res) => {
    try {
        const data = req.body

        /** Verifica se a mensagem esta vazia, se tiver vazia retorna erro */
        if (data.msg.trim() === '' || data.msg === undefined) {
            return res.json({ status: 'error', msg: 'Msg is empty' })
        }
        /** A mensagem não pode passar de 500 caracteres */
        if (data.msg.length > 500) {
            return res.json({ status: 'error', msg: 'Too big message' })
        }

        /** Se o ID não for um ObjectId valido então retorna erro */
        if (!mongoose.Types.ObjectId.isValid(data.userID)) {
            return res.json({ status: 'error', msg: 'Invalid ID' })
        }

        /** Verifica se o ID informado existe no banco de dados. Se não retornar
         * algum valor então o ID é falso
         */
        const user = await Users.findOne({ _id: data.userID })
        if (!user) {
            return res.json({ status: 'error', msg: 'Invalid ID' })
        }

        /** Se tiver tudo ok até aqui então salva a msg no DB */
        await chat({
            userID: data.userID.toString(),
            author: user.name,
            authorPicture: user.profilePicture,
            msg: data.msg.toString()
        }).save()

        /** Depois que salvar os dados então retornamos success */
        return res.json({ status: 'success', msg: 'success' })
    } catch (error) {
        console.log('Catch error: ', error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}
