import hlp from '../helpers'

export default async function reqLogout(token) {
    const options = {
        method: 'PUT',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' }
    }
    const url = `${hlp.BACKEND_HOST}/logout`

    await fetch(url, options)

    if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('session', JSON.stringify(hlp.EMPTY_SESSION))
    }

    window.location.reload()
}
