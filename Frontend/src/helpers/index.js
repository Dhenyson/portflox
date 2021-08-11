const hlp = {
    APP_NAME: 'Portflox',
    APP_DESCRIPTION:
        'O lugar perfeito para compartilhar suas habilidades de forma simples e limpa para milhares de pessoas.',
    APP_BANNER: 'images/banner.jpg',
    BACKEND_HOST: 'https://backend.com',
    // BACKEND_HOST: 'http://10.0.0.164:3002',
    FRONTEND_HOST: 'https://portflox.com',
    DEFAULT_PROFILE_IMG: '/images/profilePictureDefault.png',
    DEFAULT_PORTFOLIO_BANNER: '/images/imagePortfolioDefault.png',
    REVALIDATE_TIME: 1,
    EMPTY_SESSION: {
        accessToken: '',
        tokenExpirationDate: '',
        user: {
            id: '',
            email: '',
            emailVerification: false,
            name: '',
            slug: '',
            profilePicture: '',
            birth: '',
            situation: '',
            local: '',
            city: '',
            state: '',
            country: '',
            bio: '',
            linkedin: '',
            github: '',
            youtube: '',
            instagram: '',
            twitter: '',
            tokenExpirationDate: '',
            stars: []
        }
    }
}

export default hlp
