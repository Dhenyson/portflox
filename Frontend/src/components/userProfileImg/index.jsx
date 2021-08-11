import { UserImgContainer } from './styles'
import { useState } from 'react'
import hlp from '../../helpers'
import { useEffect } from 'react'

export default function ContainerUserImg(props) {
    const [img, setImg] = useState(hlp.DEFAULT_PROFILE_IMG)

    function handleOnError() {
        setImg(hlp.DEFAULT_PROFILE_IMG)
    }

    useEffect(() => {
        if (props.user.profilePicture.length >= 1) {
            setImg(`${hlp.BACKEND_HOST}/pictures/${props.user.profilePicture}`)
        } else {
            setImg(hlp.DEFAULT_PROFILE_IMG)
        }
    }, [props.user])

    return (
        <UserImgContainer onClick={props.onClick}>
            <img src={img} onError={handleOnError} />
        </UserImgContainer>
    )
}
