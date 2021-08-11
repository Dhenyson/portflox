const { checkSchema } = require('express-validator')

/** Regra do validador*/
exports.support = checkSchema({
    type: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 1, max: 100 } },
        errorMessage: 'Invalid type',
        matches: {
            options: [
                /\b(?:report portfolio|report user|report comment|bug|problem|others)\b/
            ],
            errorMessage: 'Invalid type'
        }
    },
    content: {
        notEmpty: true,
        trim: true,
        isLength: { options: { min: 20, max: 3000 } },
        errorMessage: 'Invalid description'
    },
    extra: {
        trim: true,
        errorMessage: 'Invalid extra'
    }
})
