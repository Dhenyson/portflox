import hlp from '../helpers'
import reqLogout from './reqLogout'

export default async function reqCommentPost(token, portfolioID, content) {
    try {
        /** Request */
        const options = {
            method: 'POST',
            body: JSON.stringify({ portfolioID, content }),
            headers: { 'Content-Type': 'application/json' }
        }
        const url = `${hlp.BACKEND_HOST}/comment/post?token=${token}`

        const response = await fetch(url, options)
        const data = await response.json()

        if (data.msg && data.msg == 'Expired token') {
            setTimeout(() => {
                reqLogout(token)
            }, 3000)
        }

        /**return  */
        return data
    } catch (error) {
        console.log(error)
        return { status: 'error', msg: 'Server error' }
    }
}
