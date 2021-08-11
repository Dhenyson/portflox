import hlp from '../helpers'

export default async function reqUpdateEmail(token, newEmail, password) {
    try {
        /** Request */
        const options = {
            method: 'PUT',
            body: JSON.stringify({ newEmail, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${hlp.BACKEND_HOST}/updateEmail?token=${token}`

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
