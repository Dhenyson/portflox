/** Components */
import {
    Form,
    OptionalAuth,
    EyeShowIcon,
    FacebookIcon,
    GithubIcon,
    GoogleIcon
} from './styles'
import SmallWindow from '../../layouts/smallWindowModel'
import ActionButtons from '../../layouts/smallWindowModel/actionButtonsArea'
import CloseButton from '../../buttons/closeButtonIcon'
import ButtonOne from '../../buttons/buttonOne'
import ForgotPasswordModal from './forgotPasswordModal'
import Modal from '../../modal'
/** Dependencies */
import { useState, useEffect, useRef } from 'react'
import { useContextValues } from '../../../context'
import Link from 'next/link'
import reqLogin from '../../../services/reqLogin'
import updateLocalSession from '../../../utils/updateLocalSession'

/**Start component */
export default function LogginWindow() {
    const [passwordType, setPasswordType] = useState('password')
    const [stateInputTextEmail, setStateInputTextEmail] = useState('')
    const [stateInputTextPassword, setStateInputTextPassword] = useState('')

    const [modalForgotVisibility, setModalForgotVisibility] = useState(0)

    /** Get input password ref to use with the focus */
    const refInputPassword = useRef(null)

    const {
        loginVisibility,
        setLoginVisibility,
        authenticated,
        setAuthenticated,
        setRegisterVisibility,
        showFlashMsg,
        setLoaderBarVisibility,
        setSession
    } = useContextValues()

    function handleShowPassword() {
        setPasswordType(passwordType == 'password' ? 'text' : 'password')
    }

    function handleInputTextEmail(e) {
        var text = e.target.value.replace(/\s/, '')
        setStateInputTextEmail(text)
    }
    function handleInputTextPassword(e) {
        var text = e.target.value.replace(/\s/, '')
        setStateInputTextPassword(text)
    }

    function handleKeyPressEmail(e) {
        if (e.charCode == 13) {
            refInputPassword.current.focus()
        }
    }

    async function requestLoginButton() {
        setLoaderBarVisibility(1)
        const response = await reqLogin(
            stateInputTextEmail,
            stateInputTextPassword
        )
        setLoaderBarVisibility(0)
        if (response.status == 'success') {
            updateLocalSession(response)
            setSession(response)
            setAuthenticated(true)
            setLoginVisibility(false)
        }

        showFlashMsg(response.status, 5, response.msg)
    }

    function handleKeyPressPassword(e) {
        if (e.charCode == 13) {
            requestLoginButton()
        }
    }

    function handleButtonRegister() {
        setRegisterVisibility(true)
        setLoginVisibility(false)
    }

    /** Temporaria ate fazer as funções de cada botao dessa tela */
    function handleOptionalAuth() {
        showFlashMsg('success', 5, 'Coming soon')
    }

    useEffect(() => {
        if (authenticated) {
            setLoginVisibility(false)
        }
    }, [authenticated])

    return (
        <SmallWindow className={!loginVisibility && 'displayNone'}>
            <Modal
                visibility={modalForgotVisibility}
                bgClick={() => setModalForgotVisibility(0)}
            >
                <ForgotPasswordModal
                    cancel={() => setModalForgotVisibility(0)}
                />
            </Modal>
            <Form method='POST' action='.'>
                <input
                    className='inputForm'
                    type='email'
                    name='email'
                    placeholder='E-mail'
                    onChange={handleInputTextEmail}
                    onKeyPress={handleKeyPressEmail}
                    value={stateInputTextEmail}
                    required
                />

                <div className='pswdArea'>
                    <input
                        className='inputForm'
                        type={passwordType}
                        name='password'
                        placeholder='Password'
                        onChange={handleInputTextPassword}
                        onKeyPress={handleKeyPressPassword}
                        value={stateInputTextPassword}
                        ref={refInputPassword}
                        required
                    />
                    <span onClick={handleShowPassword} className='showPassword'>
                        <EyeShowIcon />
                    </span>
                </div>

                <p
                    className='forgetPassword'
                    onClick={() => setModalForgotVisibility(1)}
                >
                    Forgot password
                </p>
            </Form>

            <OptionalAuth>
                <span
                    className='optionalAuthItem facebook'
                    onClick={handleOptionalAuth}
                >
                    <FacebookIcon />
                </span>
                <span
                    className='optionalAuthItem github'
                    onClick={handleOptionalAuth}
                >
                    <GithubIcon />
                </span>
                <span
                    className='optionalAuthItem google'
                    onClick={handleOptionalAuth}
                >
                    <GoogleIcon />
                </span>
            </OptionalAuth>

            <ActionButtons>
                <ButtonOne
                    text='Register'
                    onClick={handleButtonRegister}
                    type={2}
                />

                <ButtonOne
                    text='Confirm'
                    onClick={() =>
                        requestLoginButton(
                            stateInputTextEmail,
                            stateInputTextPassword
                        )
                    }
                />
            </ActionButtons>
        </SmallWindow>
    )
}
