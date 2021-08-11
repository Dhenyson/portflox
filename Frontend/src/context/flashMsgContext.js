import { useState } from 'react'

export default function flashMsgContext() {
    const [flashMsgVisibility, setMsgVisibility] = useState(false)
    const [progressMsgWidth, setProgressMsgWidth] = useState('100%')
    const [typeFlashMsg, setTypeFlashMsg] = useState('success')
    const [flashMsg, setFlashMsg] = useState('')
    const [activeMsg, setActiveMessage] = useState(false)

    const [time1, setTime1] = useState(null)
    const [time2, setTime2] = useState(null)

    function handleShow(type = 'success', time = 5, message = '') {
        setActiveMessage(true)
        setTypeFlashMsg(type)
        setFlashMsg(message)
        setMsgVisibility(true)

        setTime1(
            setTimeout(() => {
                setProgressMsgWidth('0%')
            }, 100)
        )

        setTime2(
            setTimeout(() => {
                closeFlashMsg()
            }, time * 1000)
        )
    }

    function showFlashMsg(type = 'success', time = 5, message = '') {
        if (activeMsg) {
            closeFlashMsg()
            handleShow(type, time, message)
        } else {
            handleShow(type, time, message)
        }
    }

    function closeFlashMsg() {
        setMsgVisibility(false)
        setProgressMsgWidth('100%')
        setTypeFlashMsg('success')
        setFlashMsg('')
        setActiveMessage(false)
        clearTimeout(time1)
        clearTimeout(time2)
    }

    return {
        flashMsgVisibility,
        progressMsgWidth,
        typeFlashMsg,
        flashMsg,
        showFlashMsg,
        closeFlashMsg
    }
}
