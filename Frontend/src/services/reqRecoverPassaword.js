import loginValidation from '../validators/loginValidation'
import hlp from '../helpers'

export default async function reqRecoverPassoword(email) {
    try {
        /** Request */
        const options = {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${hlp.BACKEND_HOST}/recoverPassword`

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
