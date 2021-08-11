const removeImports = require('next-remove-imports')({})

module.exports = removeImports({
    images: {
        domains: [
            'localhost',
            '10.0.0.164',
            'dhenyson.vercel.app',
            'dhenyson.vercel',
            'dhenyson.com',
            'www.dhenyson.com',
            'dhenyson'
        ]
    }
})
