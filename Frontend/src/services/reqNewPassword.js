import hlp from '../helpers'

export default async function reqNewPassword(token, password) {
    try {
        /** Request */
        const options = {
            method: 'POST',
            body: JSON.stringify({ password }),
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${hlp.BACKEND_HOST}/recover/${token}`

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
