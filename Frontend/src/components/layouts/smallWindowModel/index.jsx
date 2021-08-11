import { WrapperSmallWindow, ContainerSmallWindow } from './styles'

export default function SmallWindow(props) {
    return (
        <ContainerSmallWindow className={props.className}>
            {props.children}
        </ContainerSmallWindow>
    )
}
