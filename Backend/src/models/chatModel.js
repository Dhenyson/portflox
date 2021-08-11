const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    userID: { type: mongoose.ObjectId, required: true },
    author: { type: String, required: true, min: 3, max: 30 },
    authorPicture: { type: String, required: true },
    msg: { type: String, required: true, min: 1, max: 500 },
    date: { type: Date, default: Date.now(), required: true },
    like: { type: Array },
})

const modelName = "chat"

//Verifica se uma conexão já esta aberta, se sim então usa a mesma
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}