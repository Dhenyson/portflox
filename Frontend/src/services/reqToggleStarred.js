import hlp from '../helpers'
import reqLogout from './reqLogout'

export default async function reqToggleStarred(token, targetSlug) {
    try {
        /** Backend request */
        const options = {
            method: 'PUT',
            body: JSON.stringify({ targetSlug }),
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${hlp.BACKEND_HOST}/user/star?token=${token}`

        const response = await fetch(url, options)
        const data = await response.json()

        if (data.msg && data.msg == 'Expired token') {
            setTimeout(() => {
                reqLogout(token)
            }, 3000)
        }

        /** return */
        return { status: data.status, msg: data.msg }
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            msg: 'Unknnow error, please try again later!'
        }
    }
}
