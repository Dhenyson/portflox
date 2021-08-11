const { validationResult } = require('express-validator')
const fs = require('fs')

exports.handleErrors = async (req, res, next) => {
    try {
        /** Verifica se o validator deu tudo certo */
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            /** Se nao deu certo vamos verificar se algum arquivo foi enviado
             * e apagar, pois se não, mesmo com erro o arquivo será salvo*/
            const pathFile =
                __dirname + '../../../public/images/portfolioImages/'
            if (req.files) {
                if (req.files.length > 0) {
                    /** Vamos fazer um map para cada arquivo e apaga-los */
                    req.files.map(item => {
                        fs.unlink(
                            `${pathFile}${item.filename}`,
                            function (err) {
                                if (err) {
                                    console.log(err.message)
                                    return res.json({
                                        status: 'error',
                                        msg: 'Server error'
                                    })
                                }
                                console.log(
                                    'Arquivo deletado por causa de erro'
                                )
                            }
                        )
                    })
                }
            }

            const { category } = errors.mapped()

            if (category) {
                console.log(errors)
                return res.json({ status: 'error', msg: category.msg })
            } else {
                console.log(errors)
                return res.json({ status: 'error', msg: errors.errors[0].msg })
            }
        }

        next()
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error', msg: 'Server error' })
    }
}
