const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    author: { type: mongoose.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true, min: 3, max: 100 },
    description: { type: String, required: true },
    body: { type: String, required: true, min: 3, max: 500000 },
    category: { type: String, required: true },
    images: { type: Array, required: true },
    creationDate: { type: Date, required: true },
    updateDate: { type: Date, required: true },
    slug: { type: String, required: true, min: 3, max: 150 },
    likes: { type: Array, required: true },
    tags: { type: Array, required: true },
    commentsAmount: { type: Number }
})

const modelName = 'portfolio'

//Verifica se uma conexão já esta aberta, se sim então usa a mesma
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}
