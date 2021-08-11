import { ThemeProvider } from 'styled-components'
import { useContextValues } from '../context'

export default function MyThemeProvider(props) {
    const { theme } = useContextValues()

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
