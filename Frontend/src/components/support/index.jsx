import { WrapperSupport, ContainerSupport } from './styles'
import FlashMessage from '../flashMessage'
import MenuSelect from '../MenuSelect'
import ButtonOne from '../buttons/buttonOne'

import { useContextValues } from '../../context'
import menuSelectOptions from '../../helpers/menuSelectOptions'
import reqSupport from '../../services/reqSupport'

import { useEffect, useState } from 'react'

//** props:  type, extra, visibility */
export default function Support(props) {
    const [textArea, setTextArea] = useState('')
    const [typeSup, setTypeSup] = useState('')

    const { supportOptions } = menuSelectOptions()
    const { showFlashMsg, setLoaderBarVisibility, session } = useContextValues()

    function cancelButtonAction() {
        setTextArea('')
        props.close()
    }
    function handleChangeMenuSelect(e) {
        setTypeSup(e.target.value)
    }
    async function sendButtonAction() {
        if (textArea.length <= 0) {
            return showFlashMsg('error', 5, 'Detail your message')
        } else if (textArea.length < 20) {
            return showFlashMsg('error', 5, 'Your message needs more details')
        }

        let token = session.accessToken
        let type = typeSup
        let content = textArea
        let extra = JSON.stringify(props.extra)

        if (props.type.length > 1) {
            type = props.type
        }
        if (props.type.length <= 0 && type.length <= 0) {
            return showFlashMsg('error', 5, 'Choose the type of support')
        }

        setLoaderBarVisibility(1)
        const response = await reqSupport(token, type, content, extra)
        setLoaderBarVisibility(0)

        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)
        }
        if (response.status == 'success') {
            setTextArea('')
            setTypeSup('')
            props.close()
        }
    }

    return (
        <WrapperSupport visibility={props.visibility}>
            <FlashMessage />
            <ContainerSupport>
                <h1>Support</h1>
                {props.type == 'report portfolio' && (
                    <p id='typeFix'>Detail your message as much as possible:</p>
                )}
                {props.type == 'report comment' && (
                    <p id='typeFix'>Detail your message as much as possible:</p>
                )}
                {props.type == 'report user' && (
                    <p id='typeFix'>Detail your message as much as possible:</p>
                )}
                {props.type.length <= 0 && (
                    <MenuSelect
                        className='selectType'
                        options={supportOptions}
                        onChange={handleChangeMenuSelect}
                    />
                )}

                <div id='textContainer'>
                    <textarea
                        value={textArea}
                        onChange={e => setTextArea(e.target.value)}
                        rows={10}
                        placeholder='Type here...'
                    />
                    <div id='countChar'>{textArea.length}</div>
                </div>
                <div id='buttons'>
                    <ButtonOne
                        type={2}
                        text='Cancel'
                        id='btn'
                        onClick={cancelButtonAction}
                    />
                    <ButtonOne
                        text='Send'
                        id='btn'
                        onClick={sendButtonAction}
                    />
                </div>
            </ContainerSupport>
            <div className='background' onClick={props.close} />
        </WrapperSupport>
    )
}
