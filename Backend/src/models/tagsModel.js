const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    tags: { type: Array, required: true, min: 1, max: 10 }
})

const modelName = "tags"

//Verifica se uma conexão já esta aberta, se sim então usa a mesma
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}