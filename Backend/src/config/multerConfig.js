const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

module.exports.saveSingleImageConfig = {
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2000000, //2mb
    }
}

module.exports.multiImagesConfig = {
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/pjpeg",
            "image/png",
        ]

        if ( allowedMimes.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error("Invalid file type."))
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024, //esse calculo corresponde a 2MB
    },
    dest: path.resolve(__dirname, "..", "..", "public", "images", "portfolioImages"), //onde vai ficar salvo
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "public", "images", "portfolioImages"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                /** Se tiver erro ja retorna o callback informando */
                if (err) cb(err)

                /** Pega a extensão do arquivo */
                const ext = file.mimetype.split("/")[1]

                /** Se não tiver erro retonar o callback com o novo nome do arquivo */
                const fileName = `${hash.toString("hex")}.${ext}`
                cb(null, fileName)
            })
        },
    })
}