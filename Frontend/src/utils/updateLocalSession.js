export default function updateLocalSession(session) {
    if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem('session', JSON.stringify(session))
    }

    return session
}
