import { WrapperModal } from './styles'

export default function Modal(props) {
    function closeModal() {
        setVisibility(0)
    }

    return (
        <WrapperModal
            visibility={props.visibility}
            style={props.style}
            className={props.className}
        >
            <div className='containerModal'>{props.children}</div>
            <div className='background' onClick={props.bgClick} />
        </WrapperModal>
    )
}
