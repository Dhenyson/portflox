// Inicialização
require('./app')
require('dotenv').config()

// Importações externas
const cors = require('cors')
const express = require('express')

//Importação de arquivos internos
const routes = require('./src/routes/routes')

const server = express()

/** configuração CORS */
server.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo es
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    server.use(cors())
    next()
})

/** Server config */
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true })) // para conseguir pegar parametros por requisiçoes HTTP
server.use(express.static(__dirname + '/public'))

// Server Config
server.listen(process.env.PORT, () => {
    console.log(
        `Server ON | PORT ${process.env.PORT} | ${process.env.BASE_URL}`
    )
})

// Rotas
server.use('/', routes)
