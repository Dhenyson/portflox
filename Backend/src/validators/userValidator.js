const { checkSchema } = require('express-validator')

exports.updateProfile = checkSchema({
    name: {
        notEmpty: true,
        trim: true, //Remove espaços antes e depois do nome
        isLength: { options: { min: 3, max: 50 } },
        errorMessage: 'Invalid name'
    },
    birth: {
        trim: true,
        isDate: true,
        isLength: { options: { max: 10 } },
        errorMessage: 'Invalid birth'
    },
    situation: {
        trim: true,
        isLength: { options: { max: 50 } },
        errorMessage: 'Invalid situation'
    },
    local: {
        trim: true,
        isLength: { options: { max: 50 } },
        errorMessage: 'Invalid local'
    },
    city: {
        trim: true,
        isLength: { options: { max: 50 } },
        errorMessage: 'Invalid city'
    },
    state: {
        trim: true,
        isLength: { options: { min: 2, max: 60 } },
        errorMessage: 'Invalid state'
    },
    country: {
        trim: true,
        isLength: { options: { max: 50 } },
        errorMessage: 'Invalid country'
    },
    slug: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 3, max: 50 } },
        errorMessage: 'Invalid slug'
    },
    bio: {
        trim: true,
        isLength: { options: { max: 3000 } },
        errorMessage: 'Invalid: bio'
    },
    linkedin: {
        trim: true,
        isLength: { options: { max: 60 } },
        errorMessage: 'Invalid: Linkedin username'
    },
    github: {
        trim: true,
        isLength: { options: { max: 60 } },
        errorMessage: 'Invalid github username'
    },
    youtube: {
        trim: true,
        isLength: { options: { max: 60 } },
        errorMessage: 'Invalid youtuhe username'
    },
    instagram: {
        trim: true,
        isLength: { options: { max: 60 } },
        errorMessage: 'Invalid instagram username'
    },
    twitter: {
        trim: true,
        isLength: { options: { max: 60 } },
        errorMessage: 'Invalid twitter username'
    }
})

exports.updatePassword = checkSchema({
    currentPassword: {
        notEmpty: true,
        isLength: { options: { min: 6, max: 60 } },
        errorMessage: 'Invalid password'
    },
    newPassword: {
        notEmpty: true,
        isLength: { options: { min: 6, max: 60 } },
        errorMessage: 'Invalid password'
    }
})

exports.updateEmail = checkSchema({
    newEmail: {
        isEmail: true,
        errorMessage: 'Invalid Email'
    },
    password: {
        notEmpty: true,
        isLength: { options: { min: 6, max: 60 } },
        errorMessage: 'Invalid password'
    }
})

exports.star = checkSchema({
    targetSlug: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 3, max: 60 } },
        errorMessage: 'Invalid target Slug'
    }
})
