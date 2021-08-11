/** Components */
import SmallWindow from '../../layouts/smallWindowModel'
import ActionButtons from '../../layouts/smallWindowModel/actionButtonsArea'
import { Form, EyeShowIcon } from './styles'
import CloseButton from '../../buttons/closeButtonIcon'
import { useState, useEffect, useRef } from 'react'
import { useContextValues } from '../../../context'
import ButtonOne from '../../buttons/buttonOne'
import reqRegistration from '../../../services/reqRegistration'
import updateLocalSession from '../../../utils/updateLocalSession'

/**Start component */
export default function RegisterWindow() {
    /** Component States */
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordInputType, setPasswordInputType] = useState('password')

    /** Referencies */
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const pswdRef = useRef(null)
    const pswdConfirmRef = useRef(null)

    /** Contexts */
    const {
        authenticated,
        registerVisibility,
        setRegisterVisibility,
        setLoginVisibility,
        showFlashMsg,
        setLoaderBarVisibility,
        setSession,
        setAuthenticated
    } = useContextValues()

    /** Utils */
    function toggleVisibilityPassword() {
        setPasswordInputType(
            passwordInputType == 'password' ? 'text' : 'password'
        )
    }

    useEffect(() => {
        if (authenticated) {
            setRegisterVisibility(false)
        }
    }, [authenticated])

    /** Handle inputs */
    function handleTextInputName(e) {
        let text = e.target.value
            .replace(/^\s{1,}/g, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/[^\a-zA-Z\s0-9áàâãéèêíìïóôõÒöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, '')
        setName(text)
    }
    function handleTextInputEmail(e) {
        var text = e.target.value.replace(/\s/g, '')
        setEmail(text)
    }
    function handleTextInputPassword(e) {
        var text = e.target.value.replace(/\s/g, '')
        setPassword(text)
    }
    function handleTextInputRepeatePassword(e) {
        var text = e.target.value.replace(/\s/g, '')
        setPasswordConfirm(text)
    }

    /** Handle key 'Enter' */
    function handleKeyPressName(e) {
        if (e.charCode == 13) {
            emailRef.current.focus()
        }
    }
    function handleKeyPressEmail(e) {
        if (e.charCode == 13) {
            pswdRef.current.focus()
        }
    }
    function handleKeyPressPswd(e) {
        if (e.charCode == 13) {
            pswdConfirmRef.current.focus()
        }
    }
    function handleKeyPressPswdRepeat(e) {
        if (e.charCode == 13) {
            registerButtonAction()
        }
    }

    /** Handle buttons */
    function handleLoginButton() {
        setLoginVisibility(true)
        setRegisterVisibility(false)
    }

    async function registerButtonAction() {
        setLoaderBarVisibility(1)
        const response = await reqRegistration(
            name,
            email,
            password,
            passwordConfirm
        )
        setLoaderBarVisibility(0)

        if (response.status == 'success') {
            updateLocalSession(response)
            setSession(response)
            setAuthenticated(true)
            setRegisterVisibility(false)
        }

        showFlashMsg(response.status, 5, response.msg)
    }

    /** JSX */
    return (
        <SmallWindow className={!registerVisibility && 'displayNone'}>
            <Form method='POST' action='.'>
                <label className='passwordContainer'>
                    <input
                        className='inputForm'
                        type='text'
                        name='text'
                        placeholder='Name'
                        onChange={handleTextInputName}
                        onKeyPress={handleKeyPressName}
                        ref={nameRef}
                        value={name}
                        required
                    />
                </label>
                <label className='passwordContainer'>
                    <input
                        className='inputForm'
                        type={'email'}
                        name='email'
                        placeholder='E-mail'
                        onChange={handleTextInputEmail}
                        onKeyPress={handleKeyPressEmail}
                        ref={emailRef}
                        value={email}
                        required
                    />
                </label>
                <label className='passwordContainer'>
                    <input
                        className='inputForm'
                        type={passwordInputType}
                        name='password'
                        placeholder='Password'
                        onChange={handleTextInputPassword}
                        onKeyPress={handleKeyPressPswd}
                        ref={pswdRef}
                        value={password}
                        required
                    />
                    <span
                        onClick={toggleVisibilityPassword}
                        className='showPassword'
                    >
                        <EyeShowIcon />
                    </span>
                </label>
                <label className='passwordContainer'>
                    <input
                        className='inputForm'
                        type={passwordInputType}
                        name='password'
                        placeholder='Repeat password'
                        onChange={handleTextInputRepeatePassword}
                        onKeyPress={handleKeyPressPswdRepeat}
                        ref={pswdConfirmRef}
                        value={passwordConfirm}
                        required
                    />
                    <span
                        onClick={toggleVisibilityPassword}
                        className='showPassword'
                    >
                        <EyeShowIcon />
                    </span>
                </label>
            </Form>

            <ActionButtons>
                <ButtonOne text='Login' onClick={handleLoginButton} type={2} />

                <ButtonOne text='Confirm' onClick={registerButtonAction} />
            </ActionButtons>
        </SmallWindow>
    )
}
