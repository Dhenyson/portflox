const fs = require('fs')

/** Este helpe deleta as imagens quando acontece algum erro na requisição */
function removeMultiImages(files) {
    if (files.length > 0) {
        /** Vamos fazer um map para cada arquivo e apaga-los */
        const pathFile = __dirname + '../../../public/images/portfolioImages/'
        files.map(item => {
            fs.unlink(`${pathFile}${item.filename}`, function (error) {
                if (error) {
                    console.log(error)
                    return { status: 'error', msg: 'Server error' }
                }
                console.log('helper: File deleted because  of error')
            })
        })
    }
}

function removeAllImagesPortfolio(files) {
    if (files.length > 0) {
        /** Vamos fazer um map para cada arquivo e apaga-los */
        const pathFile = __dirname + '../../../public/images/portfolioImages/'
        files.map(item => {
            fs.unlink(`${pathFile}${item}`, function (error) {
                if (error) {
                    console.log(error)
                    return { status: 'error', msg: 'Server error' }
                }
                console.log(
                    'helper: File deleted because portfolio the refence portofolio was deleted'
                )
            })
        })
    }
}

/** Este helpe deleta as imagens quando acontece algum erro na requisição */
function removeMultiImagesByEdit(files) {
    if (files.length > 0) {
        /** Vamos fazer um map para cada arquivo e apaga-los */
        const pathFile = __dirname + '../../../public/images/portfolioImages/'
        files.map(item => {
            fs.unlink(`${pathFile}${item}`, function (error) {
                if (error) {
                    console.log(error)
                    return { status: 'error', msg: 'Server error' }
                }
                console.log(
                    'helper: File deleted because  portfolio was updated'
                )
            })
        })
    }
}

module.exports = {
    removeMultiImages,
    removeAllImagesPortfolio,
    removeMultiImagesByEdit
}
