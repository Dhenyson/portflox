import hlp from '../helpers'
import updateLocalSession from '../utils/updateLocalSession'
import reqLogout from './reqLogout'

export default async function apiUpdateProfile(
    token,
    name,
    birth,
    situation,
    local,
    city,
    state,
    country,
    slug,
    bio,
    linkedin,
    github,
    youtube,
    instagram,
    twitter
) {
    try {
        /** Backend request */
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                name,
                birth,
                situation,
                local,
                city,
                state,
                country,
                slug,
                bio,
                linkedin,
                github,
                youtube,
                instagram,
                twitter
            }),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        }
        const url = `${hlp.BACKEND_HOST}/updateProfile?token=${token}`

        const response = await fetch(url, options)
        const data = await response.json()

        if (data.status == 'success') {
            updateLocalSession(data)
        }

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
