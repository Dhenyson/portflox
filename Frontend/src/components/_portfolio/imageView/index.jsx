import { ContainterViewImage } from './styles'
import hlp from '../../../helpers'
import CloseButton from '../../buttons/closeButtonIcon'

export default function ImageView(props) {
    return (
        <ContainterViewImage visibility={props.visibility}>
            <img
                src={`${hlp.BACKEND_HOST}/images/portfolioImages/${props.slug}`}
            />

            <div className='close' onClick={props.onClick}>
                <CloseButton onClick={props.onClick} />
            </div>
        </ContainterViewImage>
    )
}
