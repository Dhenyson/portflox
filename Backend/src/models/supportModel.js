const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    requester: { type: mongoose.ObjectId, ref: 'users', required: true },
    type: { type: String, required: true, min: 1, max: 100 },
    content: { type: String, required: true, min: 20, max: 3000 },
    extra: { type: Object },
    date: { type: Date, required: true, default: Date.now() }
})

const modelName = 'support'

//Verifica se uma conexão já esta aberta, se sim então usa a mesma
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}
