import hlp from '../helpers'

export default async function reqResendConfirmEmail(token) {
    try {
        /** Request */
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${hlp.BACKEND_HOST}/resendConfirmEmail?token=${token}`

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
