import { ContainerRecoverPassword, EyeShowIcon } from './styles'
import ButtonOne from '../buttons/buttonOne'
import reqNewPassword from '../../services/reqNewPassword'
import { useState } from 'react'
import FlashMessage from '../flashMessage'
import { useContextValues } from '../../context'
import { useRouter } from 'next/router'

export default function RecoverPassword(props) {
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [typeInput, setTypeInput] = useState('password')

    const { showFlashMsg, setLoaderBarVisibility } = useContextValues()
    const router = useRouter()

    function toggleTypeInput() {
        setTypeInput(typeInput == 'password' ? 'text' : 'password')
    }

    async function btnRecover() {
        if (password != passwordRepeat) {
            showFlashMsg('error', 5, 'Passwords do not match')
        } else {
            setLoaderBarVisibility(1)
            const response = await reqNewPassword(props.token, password)
            setLoaderBarVisibility(0)

            if (response.status) {
                showFlashMsg(response.status, 5, response.msg)

                if (response.status == 'success') {
                    router.push('/')
                }
            }
        }
    }

    return (
        <ContainerRecoverPassword>
            <FlashMessage />
            <div className='wrapper'>
                <p> Recover Password </p>
                <div className='inputArea'>
                    <input
                        type={typeInput}
                        placeholder='New password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <EyeShowIcon onClick={toggleTypeInput} />
                </div>

                <div className='inputArea'>
                    <input
                        type={typeInput}
                        placeholder='Repeat password'
                        value={passwordRepeat}
                        onChange={e => setPasswordRepeat(e.target.value)}
                    />
                    <EyeShowIcon onClick={toggleTypeInput} />
                </div>

                <ButtonOne text='Recover' id='button' onClick={btnRecover} />
            </div>
        </ContainerRecoverPassword>
    )
}
