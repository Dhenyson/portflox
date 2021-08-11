import hlp from '../helpers'

/** Função para verificar se há token no localstorage */
export default function getLocalSession() {
    var session = hlp.EMPTY_SESSION

    if (typeof window !== 'undefined' && localStorage) {
        const response = localStorage.getItem('session')

        if (response) {
            var localSession = JSON.parse(response)
            session = localSession
        } else {
            localStorage.setItem('session', JSON.stringify(session))
        }
    }

    return session
}
