const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, min: 3, max: 60 },
    slug: { type: String, required: true, trim: true, min: 3, max: 60 },
    email: { type: String, required: true, trim: true },
    emailVerification: { type: Boolean, default: false },
    emailTokenVerification: { type: String, min: 40 },

    profilePicture: { type: String, default: '' },
    birth: { type: Date },
    situation: { type: String, trim: true, max: 60, default: '' },
    local: { type: String, trim: true, max: 60, default: '' },
    city: { type: String, trim: true, max: 60, default: '' },
    state: { type: String, trim: true, max: 2, default: '' },
    country: { type: String, trim: true, max: 60, default: '' },
    bio: { type: String, trim: true, max: 3000, default: '' },

    linkedin: { type: String, trim: true, max: 60, default: '' },
    github: { type: String, trim: true, max: 60, default: '' },
    youtube: { type: String, trim: true, max: 60, default: '' },
    instagram: { type: String, trim: true, max: 60, default: '' },
    twitter: { type: String, trim: true, max: 60, default: '' },

    portfoliosAmount: { type: Number },
    knowledge: { type: Array },
    stars: [{ type: mongoose.ObjectId, ref: 'users' }],

    joined: { type: Date },
    hash: { type: String, required: true, min: 40 },
    token: { type: String, required: true, min: 40 },
    tokenExpirationDate: { type: Date, default: Date.now() + 43200000 },

    passwordRecoveryTokenUsage: { type: Boolean, default: false },
    passwordRecoveryToken: { type: String, min: 40 },
    passwordRecoveryTokenExpiration: {
        type: Date,
        default: Date.now() + 3600000
    }
})

const modelName = 'users'

//Verifica se uma conexão já esta aberta, se sim então usa a mesma
if (mongoose.connection && mongoose.connection.models[modelName]) {
    module.exports = mongoose.connection.models[modelName]
} else {
    module.exports = mongoose.model(modelName, modelSchema)
}
