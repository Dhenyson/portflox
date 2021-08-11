import { ContainerConfirmEmail } from './styles'
import ButtonOne from '../buttons/buttonOne'
import FlashMsg from '../flashMessage'
import { useContextValues } from '../../context'
import reqConfirmEmail from '../../services/reqConfirmEmail'
import updateLocalSession from '../../utils/updateLocalSession'
import hlp from '../../helpers'

export default function ConfirmEmail(props) {
    const { showFlashMsg, setLoaderBarVisibility } = useContextValues()

    async function btnConfirm() {
        if (typeof window !== 'undefined' && localStorage) {
            setLoaderBarVisibility(1)
            const response = await reqConfirmEmail(props.token)
            setLoaderBarVisibility(0)

            if (response.status) {
                showFlashMsg(response.status, 3, response.msg)

                if (response.status == 'success') {
                    updateLocalSession(hlp.EMPTY_SESSION)
                }

                setTimeout(() => {
                    window.location.href = hlp.FRONTEND_HOST
                }, 3000)
            }
        }
    }

    return (
        <ContainerConfirmEmail>
            <FlashMsg />
            <h2> Confirm Email </h2>
            <ButtonOne text='CONFIRM' onClick={btnConfirm} />
        </ContainerConfirmEmail>
    )
}
