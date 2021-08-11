import GlobalStyle from '../styles/global'
import MyProvider from '../context'

import MyThemeProvider from '../components/MyThemeProvider'

export default function App({ Component, pageProps }) {
    return (
        <MyProvider>
            <MyThemeProvider>
                <Component {...pageProps} />
                <GlobalStyle />
            </MyThemeProvider>
        </MyProvider>
    )
}
