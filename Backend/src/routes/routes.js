const express = require('express')
const router = express.Router()
const cors = require('cors')

//Controllers
const chatController = require('../controllers/chatController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const portfolioController = require('../controllers/portfolioController')
const supportController = require('../controllers/supportController')
const commentsController = require('../controllers/commentsController')

//validators
const authValidator = require('../validators/authValidator')
const userValidator = require('../validators/userValidator')
const portfolioValidator = require('../validators/portfolioValidator')
const supportValidator = require('../validators/supportValidator')
const commentsValidator = require('../validators/commentsValidator')
const validator = require('../validators/validator')

//Middlewares
const checkPermission = require('../middlewares/checkPermission')
const imagesHandler = require('../middlewares/imagesHandler')

/** Rotas */
router.get('/ping', (req, res) => res.json({ pong: true }))

router.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo es
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    router.use(cors())
    next()
})

/** Rotas de autenticação */
router.post(
    '/register',
    authValidator.register,
    validator.handleErrors,
    authController.register
)
router.post(
    '/login',
    authValidator.login,
    validator.handleErrors,
    authController.login
)
router.post(
    '/checkTokenValidity',
    checkPermission.private,
    authController.checkTokenValidity
)
router.post(
    '/recoverPassword',
    authValidator.recoverPassword,
    validator.handleErrors,
    authController.recoverPassword
)
router.post(
    '/recover/:token',
    authValidator.recoverNewPassword,
    validator.handleErrors,
    authController.recoverNewPassword
)
router.put('/logout', checkPermission.private, authController.logout)
router.get('/users', userController.getUsers)
router.get('/users/:slug', userController.getUser)

router.post('/confirm-email/:token', authController.confirmEmail)
router.put(
    'update-email',
    checkPermission.private,
    userValidator.updateEmail,
    validator.handleErrors,
    userController.updateEmail
)

/** Rotas de chat */
router.get('/chat', chatController.getChat)
router.post('/chat', checkPermission.private, chatController.postChat)

/** Rotas de usuario */
router.put(
    '/updatePicture',
    checkPermission.private,
    imagesHandler.receiveAndVerifyImage,
    imagesHandler.resizeRenameAndSaveImage,
    userController.updatePicture
)
router.put(
    '/updateProfile',
    checkPermission.private,
    userValidator.updateProfile,
    validator.handleErrors,
    userController.updateProfile
)
router.put(
    '/updatePassword',
    checkPermission.private,
    userValidator.updatePassword,
    validator.handleErrors,
    userController.updatePassword
)
router.put(
    '/updateEmail',
    checkPermission.private,
    userValidator.updateEmail,
    validator.handleErrors,
    userController.updateEmail
)
router.post(
    '/resendConfirmEmail',
    checkPermission.private,
    userController.resendEmailConfirmLink
)
/** Interações */
router.put(
    '/user/star',
    checkPermission.private,
    userValidator.star,
    validator.handleErrors,
    userController.star
)

/** Portifolio */
router.post(
    '/portfolio/add',
    checkPermission.private,
    imagesHandler.saveMultiImages,
    portfolioValidator.addNewPortfolio,
    validator.handleErrors,
    portfolioController.add
)

router.get('/portfolios', portfolioController.getAll)
router.get('/portfolios/:slug', portfolioController.getOne)
router.get('/portfolios/user/:slug', portfolioController.getByUser)

router.put(
    '/portfolio/edit',
    checkPermission.private,
    imagesHandler.saveMultiImages,
    portfolioValidator.editPortfolio,
    validator.handleErrors,
    portfolioController.edit
)

router.delete(
    '/portfolio/delete',
    checkPermission.private,
    portfolioValidator.deletePortfolio,
    validator.handleErrors,
    portfolioController.delete
)

router.put(
    '/portfolio/likeDislike',
    checkPermission.private,
    portfolioValidator.likeDislikePortfolio,
    validator.handleErrors,
    portfolioController.likeDislikePortfolio
)

/** Comments */
router.post(
    '/comment/post',
    checkPermission.private,
    commentsValidator.post,
    validator.handleErrors,
    commentsController.post
)
router.delete(
    '/comment/delete',
    checkPermission.private,
    commentsValidator.delete,
    validator.handleErrors,
    commentsController.delete
)
router.put(
    '/comment/edit',
    checkPermission.private,
    commentsValidator.edit,
    validator.handleErrors,
    commentsController.edit
)
router.put(
    '/comment/like',
    checkPermission.private,
    commentsValidator.like,
    validator.handleErrors,
    commentsController.like
)
router.put(
    '/comment/dislike',
    checkPermission.private,
    commentsValidator.dislike,
    validator.handleErrors,
    commentsController.dislike
)
router.get('/comments/get/:portfolioSlug', commentsController.get)

//** Support */
router.put(
    '/support',
    checkPermission.private,
    supportValidator.support,
    validator.handleErrors,
    supportController.support
)

module.exports = router
