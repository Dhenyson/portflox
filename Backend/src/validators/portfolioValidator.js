/** Importações */
const { checkSchema } = require('express-validator')

/** Regra do validador*/
exports.addNewPortfolio = checkSchema({
    title: {
        notEmpty: true,
        trim: true, //Remove espaços antes e depois do nome
        isLength: { options: { min: 10, max: 70 } },
        errorMessage: 'Invalid title (min: 10, max: 70)'
    },
    description: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 70, max: 280 } },
        errorMessage: 'Invalid description (min: 70, max: 280)'
    },
    category: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 4, max: 12 } },
        errorMessage: 'Invalid category',
        matches: {
            options: [
                /\b(?:work|service|study|annotation|contribution|blog)\b/
            ],
            errorMessage: 'Invalid category'
        }
    },
    body: {
        trim: true,
        isLength: { options: { min: 250, max: 500000 } },
        errorMessage: 'Invalid body (min: 200)'
    },
    tags: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 1, max: 350 } },
        errorMessage: 'Invalid tags (min: 1)'
    }
})

exports.editPortfolio = checkSchema({
    portfolioID: {
        isMongoId: true,
        errorMessage: 'Invalid Portfolio ID'
    },
    title: {
        notEmpty: true,
        trim: true, //Remove espaços antes e depois do nome
        isLength: { options: { min: 10, max: 70 } },
        errorMessage: 'Invalid title (min: 10, max: 70)'
    },
    description: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 70, max: 280 } },
        errorMessage: 'Invalid description (min: 70, max: 280)'
    },
    category: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 4, max: 12 } },
        errorMessage: 'Invalid category',
        matches: {
            options: [
                /\b(?:work|service|study|annotation|contribution|blog)\b/
            ],
            errorMessage: 'Invalid category'
        }
    },
    body: {
        trim: true,
        isLength: { options: { min: 200, max: 500000 } },
        errorMessage: 'Invalid body (min: 200)'
    },
    tags: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 1, max: 350 } },
        errorMessage: 'Invalid tags (min: 1)'
    }
})

exports.deletePortfolio = checkSchema({
    portfolioID: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 20, max: 30 } },
        errorMessage: 'Invalid Portfolio ID'
    }
})

exports.likeDislikePortfolio = checkSchema({
    portfolioID: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 20, max: 30 } },
        errorMessage: 'Invalid Portfolio ID'
    }
})
