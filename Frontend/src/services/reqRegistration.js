import registrationValidation from '../validators/registrationValidation'
import hlp from '../helpers'
import reqLogout from './reqLogout'

export default async function reqRegistration(
    name,
    email,
    password,
    passwordRepeat
) {
    try {
        /** Validation */
        const validationResponse = registrationValidation(
            name,
            email,
            password,
            passwordRepeat
        )
        if (validationResponse.status == 'error') {
            return validationResponse
        }

        /** Backend request */
        const options = {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
        const url = `${hlp.BACKEND_HOST}/register`

        const response = await fetch(url, options)
        const data = await response.json()

        if (data.msg && data.msg == 'Expired token') {
            setTimeout(() => {
                reqLogout(token)
            }, 3000)
        }

        return data
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            msg: 'Unknnow error, please try again later!'
        }
    }
}
