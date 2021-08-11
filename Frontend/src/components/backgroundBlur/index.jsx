import { Container, BlurBackground } from './styles'

import { useEffect, useState } from 'react'
import { useContextValues } from '../../context'

export default function Item() {
    const [bgVisivility, setBgVisibility] = useState(false)
    const [containerVisivility, setContainerVisivility] = useState(false)

    const {
        profileVisibility,
        loginVisibility,
        registerVisibility,
        privateProfileVisibility,
        setPrivateProfileVisibility,
        setRegisterVisibility,
        setLoginVisibility,
        editProfileVisibility,
        setEditProfileVisibility,
        modalStarredVisibility
    } = useContextValues()

    useEffect(() => {
        if (
            profileVisibility ||
            loginVisibility ||
            registerVisibility ||
            privateProfileVisibility ||
            editProfileVisibility ||
            modalStarredVisibility
        ) {
            setContainerVisivility(true)
            setTimeout(() => {
                setBgVisibility(true)
            }, 50)
        } else {
            setBgVisibility(false)
            setTimeout(() => {
                setContainerVisivility(false)
            }, 500)
        }
    }, [
        profileVisibility,
        loginVisibility,
        registerVisibility,
        privateProfileVisibility,
        editProfileVisibility,
        modalStarredVisibility
    ])

    function bgClickAction() {
        setPrivateProfileVisibility(false)
        setRegisterVisibility(false)
        setLoginVisibility(false)
        setEditProfileVisibility(false)
    }

    return (
        <Container
            onClick={bgClickAction}
            className={containerVisivility ? '' : 'displayNone'}
        >
            <BlurBackground
                onClick={bgClickAction}
                className={bgVisivility ? 'visible' : 'invisible'}
            />
        </Container>
    )
}
