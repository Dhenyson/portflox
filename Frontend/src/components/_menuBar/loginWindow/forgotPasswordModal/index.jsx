import { ContainerModalForgotPassword } from './styles'
import ButtonOne from '../../../buttons/buttonOne'
import { useState } from 'react'
import reqForgotPassword from '../../../../services/reqRecoverPassaword'
import { useContextValues } from '../../../../context'

export default function ModalForgotPassword(props) {
    const [input, setInput] = useState('')
    const { showFlashMsg } = useContextValues()

    function sendByPressEnter(e) {
        if (e.keyCode === 13) {
            btnSend()
        }
    }

    function handleInput(e) {
        let text = e.target.value.replace(/\s/, '')
        setInput(text)
    }

    async function btnSend() {
        const response = await reqForgotPassword(input)
        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)

            if (response.status == 'success') {
                setInput('')
            }
        }

        props.cancel()
    }

    return (
        <ContainerModalForgotPassword>
            <p>Email</p>
            <input
                type='email'
                placeholder='Type here'
                value={input}
                onChange={handleInput}
                onKeyDown={sendByPressEnter}
            />
            <div className='buttons'>
                <ButtonOne
                    text='CANCEL'
                    id='buttonOne'
                    onClick={props.cancel}
                    type={2}
                />
                <ButtonOne text='SEND' id='buttonTwo' onClick={btnSend} />
            </div>
        </ContainerModalForgotPassword>
    )
}
