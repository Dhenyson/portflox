import loginValidation from '../validators/loginValidation'
import hlp from '../helpers'

export default async function reqSignin(email, password) {
    try {
        /** Validation */
        const validationResponse = await loginValidation(email, password)
        if (validationResponse.status == 'error') {
            return {
                status: 'error',
                msg: validationResponse.msg
            }
        }

        /** Request */
        const options = {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
        const url = `${hlp.BACKEND_HOST}/login`

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
