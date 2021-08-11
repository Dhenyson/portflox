import hlp from '../helpers'
import reqLogout from './reqLogout'

export default async function reqPortfoliosByUser(slug) {
    try {
        /** Backend request */
        const url = `${hlp.BACKEND_HOST}/portfolios/user/${slug}`

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
        return { status: 'error', msg: 'Server error' }
    }
}
