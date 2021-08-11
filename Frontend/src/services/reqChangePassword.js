import hlp from '../helpers'

export default async function reqChangePassword(
    token,
    currentPassword,
    newPassword
) {
    try {
        /** Request */
        const options = {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${hlp.BACKEND_HOST}/updatePassword?token=${token}`

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
