import loginValidation from '../validators/loginValidation'
import hlp from '../helpers'

export default async function reqConfirmEmail(token) {
    try {
        /** Request */
        const options = { method: 'POST' }
        const url = `${hlp.BACKEND_HOST}/confirm-email/${token}`

        const response = await fetch(url, options)
        const data = await response.json()
        /** return */
        return data
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            msg: 'Unknnow error, please try again later!'
        }
    }
}
