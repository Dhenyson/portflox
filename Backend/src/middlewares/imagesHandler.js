const multer = require('multer')
const uuid = require('uuid')
const jimp = require('jimp')

/** Multer config */
const {
    multiImagesConfig,
    saveSingleImageConfig
} = require('../config/multerConfig')

exports.receiveAndVerifyImage = (req, res, next) => {
    /** Usa o multer salvando o arquivo na memoria e só pode ser um unico arquivo.*/
    const upload = multer(saveSingleImageConfig).single('profilePicture')

    /** usa nossa instancia do multer verificando se houve erros */
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({ status: 'error', error: err.message })
        } else if (err) {
            return res.json({ status: 'error', error: err.message })
        }

        /** Se chegou até aqui é porque não houve erro, mas vamos reforçar
         * que req.file não esteja vazio
         */
        if (!req.file) {
            return res.json({ status: 'error', error: 'Picture not received' })
        }

        /** Verifica se o arquivo em req.file é do tipo jpeg, jpg ou png */
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.json({
                status: 'error',
                error: 'Unsupported file. Send jpeg, jpg or png'
            })
        }

        /** Se tiver tudo certo então vamos passar a requisição
         * para o proximo middleware */
        next()
    })
}

exports.resizeRenameAndSaveImage = async (req, res, next) => {
    try {
        /** O mimetype vem no formato "tipo/subtipo", vamos pegar o subtipo
         * que é a extensão do arquivo.
         * Depois criar um nome unico e a terceira linha cria um novo campo no body
         * passando o novo nome do arquivo.*/
        const ext = req.file.mimetype.split('/')[1]
        let filename = `${uuid.v4()}-${Date.now()}.${ext}`
        req.file.name = filename

        /**  Com Jimp vamos ler o arquivo na memoria,
         * redimensiona a imagem e depois salva
         */
        const avatar = await jimp.read(req.file.buffer)
        await avatar.resize(180, jimp.AUTO)
        await avatar.write(`./public/pictures/${filename}`)

        next()
    } catch (error) {
        return res.json({ status: 'error', error: error.message })
    }
}

exports.saveMultiImages = async (req, res, next) => {
    /** Faz as verificações e salva as imagens.*/
    const upload = multer(multiImagesConfig).array('file', 5)

    /** usa a função de callback de nossa instancia do multer verificando se houve erros */
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.json({ status: 'error', error: err.message })
        } else if (err) {
            return res.json({ status: 'error', error: err.message })
        }

        /** Se tiver tudo certo então vamos passar a requisição
         * para o proximo middleware */
        next()
    })
}
