const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    portfolioID: { type: mongoose.ObjectId, ref: 'portfolios', required: true },
    author: { type: mongoose.ObjectId, ref: 'users', required: true },
    content: { type: String, required: true, min: 1, max: 3000 },
    creationDate: { type: Date, required: true },
    editDate: { type: Date, required: true },
    answers: [{ type: mongoose.ObjectId, ref: 'comments' }],
    oldContents: [{ type: Object }],
    likes: [{ type: mongoose.ObjectId, ref: 'comments' }],
    dislikes: [{ type: mongoose.ObjectId, ref: 'comments' }]
})

const modelName = 'comments'

//Verifica se uma conexão já esta aberta, se sim então usa a mesma
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}
