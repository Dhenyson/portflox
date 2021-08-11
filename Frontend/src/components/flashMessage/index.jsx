import { Wrapper, Container } from './styles'
import { useContextValues } from '../../context'

export default function FlashMessage(props) {
    const {
        flashMsgVisibility,
        progressMsgWidth,
        typeFlashMsg,
        flashMsg,
        closeFlashMsg
    } = useContextValues()

    function handleClick() {
        closeFlashMsg()
    }

    return (
        <Wrapper
            className={flashMsgVisibility ? '' : 'displayNone'}
            onClick={handleClick}
        >
            <Container className={typeFlashMsg == 'error' && 'error'}>
                <p>{flashMsg}</p>
                <p className='tip'>click or tap to close</p>
            </Container>
            <div className='progress-bar-container'>
                <div
                    className='progress-bar'
                    style={{ width: progressMsgWidth }}
                ></div>
            </div>
        </Wrapper>
    )
}
