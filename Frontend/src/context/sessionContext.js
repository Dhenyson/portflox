import { useState } from 'react'

import getLocalSession from '../utils/getLocalSession'
import setInitialAuthState from '../utils/setInitialAuthState'

export default function authContext() {
    const [session, setSession] = useState(() => getLocalSession())
    const [authenticated, setAuthenticated] = useState(() =>
        setInitialAuthState()
    )

    return { session, setSession, authenticated, setAuthenticated }
}
