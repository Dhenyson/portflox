import hlp from '../helpers'
import reqLogout from './reqLogout'

export default async function reqPortfolioEdit(
    token,
    category,
    title,
    tags,
    description,
    files,
    body,
    portfolioID
) {
    try {
        let formData = new FormData()

        files.slice(0, 5).map(img => {
            formData.append('file', img.file)
        })

        formData.append('category', category)
        formData.append('title', title)
        formData.append('tags', tags)
        formData.append('description', description)
        formData.append('body', body)
        formData.append('portfolioID', portfolioID)

        /** Backend request */
        const options = { method: 'PUT', body: formData }
        const url = `${hlp.BACKEND_HOST}/portfolio/edit?token=${token}`

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
