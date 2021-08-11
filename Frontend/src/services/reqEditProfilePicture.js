import hlp from '../helpers'
import getLocalSession from '../utils/getLocalSession'
import reqLogout from './reqLogout'

export default async function EditProfilePicture(image) {
    try {
        const formData = new FormData()
        formData.append('profilePicture', image)

        const session = getLocalSession()
        const token = session.accessToken
        const url = `${hlp.BACKEND_HOST}/updatePicture?token=${token}`
        const options = { method: 'PUT', body: formData }

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
