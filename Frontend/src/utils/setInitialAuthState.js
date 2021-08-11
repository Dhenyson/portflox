/** Função para verificar se há token no localstorage */
export default function setInitialAuthStatus() {
    var status = false

    if (typeof window !== 'undefined' && localStorage) {
        const response = localStorage.getItem('session')

        if (response) {
            const data = JSON.parse(response)
            if (data.accessToken) {
                if (data.accessToken.length > 1) {
                    status = true
                }
            }
        }
    }

    return status
}
