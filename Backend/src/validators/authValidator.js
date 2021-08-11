const { checkSchema } = require('express-validator')

module.exports.register = checkSchema({
    name: {
        notEmpty: true,
        trim: true, //Remove espaços antes e depois do nome
        isLength: { options: { min: 3, max: 50 } },
        errorMessage: 'Invalid name'
    },
    email: {
        isEmail: true,
        normalizeEmail: true, //deixa tudo minúsculo e formato padrão
        isLength: { options: { min: 7, max: 50 } },
        errorMessage: 'Invalid email'
    },
    password: {
        notEmpty: true,
        isLength: { options: { min: 6, max: 60 } },
        errorMessage: 'Invalid password'
    }
})

module.exports.login = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true, //deixa tudo minúsculo e formato padrão
        isLength: { options: { min: 7, max: 50 } },
        errorMessage: 'Invalid email'
    },
    password: {
        notEmpty: true,
        isLength: { options: { min: 6, max: 60 } },
        errorMessage: 'Invalid password'
    }
})

exports.recoverPassword = checkSchema({
    email: {
        isEmail: true,
        normalizeEmail: true, //deixa tudo minúsculo e formato padrão
        isLength: { options: { min: 7, max: 50 } },
        errorMessage: 'Invalid email'
    }
})

exports.recoverNewPassword = checkSchema({
    password: {
        notEmpty: true,
        isLength: { options: { min: 6, max: 60 } },
        errorMessage: 'Invalid password'
    }
})
