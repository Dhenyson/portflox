const { checkSchema } = require('express-validator')

exports.post = checkSchema({
    portfolioID: {
        notEmpty: true,
        isMongoId: true,
        trim: true,
        isLength: { options: { min: 20, max: 30 } },
        errorMessage: 'Invalid Portfolio ID'
    },
    content: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 1, max: 3000 } },
        errorMessage: 'Invalid comment'
    }
})

exports.delete = checkSchema({
    commentID: {
        isMongoId: true,
        errorMessage: 'Invalid comment ID'
    }
})
exports.edit = checkSchema({
    commentID: {
        isMongoId: true,
        errorMessage: 'Invalid comment ID'
    },
    content: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 1, max: 3000 } },
        errorMessage: 'Invalid comment'
    }
})

exports.like = checkSchema({
    commentID: {
        isMongoId: true,
        errorMessage: 'Invalid comment ID'
    }
})
exports.dislike = checkSchema({
    commentID: {
        isMongoId: true,
        errorMessage: 'Invalid comment ID'
    }
})
