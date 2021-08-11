import { GlobalWrapper } from './styles'
import { useContextValues } from '../../../context'

export default function Layout(props) {
    const { windowOrModalOpen } = useContextValues()

    return (
        <GlobalWrapper noScroll={windowOrModalOpen() ? 1 : 0}>
            {props.children}
        </GlobalWrapper>
    )
}
