//Importações externas
require('dotenv').config()
const mongoose = require('mongoose')

//Inicialização do MongoDB
mongoose.connect(
    'urlDoMongoDB_stringOu.env',
    {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    }
)
mongoose.Promise = global.Promise
mongoose.connection.on('error', error => console.log('Error: ', error.message))
