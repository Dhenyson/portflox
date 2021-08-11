import { useEffect, useState } from 'react'
import themes from '../styles/themes'

export default function themeApp() {
    const [state, setState] = useState(() => setInitialTheme())

    function setInitialTheme() {
        if (typeof window !== 'undefined' && localStorage) {
            const response = localStorage.getItem('theme')

            if (response) {
                switch (response) {
                    case 'defaultTheme':
                        return themes.defaultTheme
                    case 'dark':
                        return themes.dark
                    case 'light':
                        return themes.light
                    case 'light2':
                        return themes.light2
                    case 'hot':
                        return themes.hot
                    case 'pink':
                        return themes.pink
                    case 'blue':
                        return themes.blue
                    default:
                        return themes.defaultTheme
                }
            } else {
                return themes.dark
            }
        } else {
            return themes.dark
        }
    }

    function changeTheme(theme) {
        switch (theme) {
            case 'defaultTheme':
                setState(themes.defaultTheme)
                break
            case 'dark':
                setState(themes.dark)
                break
            case 'light':
                setState(themes.light)
                break
            case 'light2':
                setState(themes.light2)
                break
            case 'hot':
                setState(themes.hot)
                break
            case 'pink':
                setState(themes.pink)
                break
            case 'blue':
                setState(themes.blue)
                break
            default:
                setState(themes.defaultTheme)
                break
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem('theme', state.title)
        }
    }, [state])

    return [state, changeTheme]
}
