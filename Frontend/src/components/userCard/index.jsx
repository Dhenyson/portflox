import {
    ContainerItemMoreStarred,
    MapIcon,
    StarsIcon,
    WorkIcon
} from './styles'
import ButtonOne from '../buttons/buttonOne'

import hlp from '../../helpers'
import { useContextValues } from '../../context'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function UserCard({ user, className }) {
    const [img, setImg] = useState(hlp.DEFAULT_PROFILE_IMG)
    const [showViewProfile, setShowViewProfile] = useState(0)

    const router = useRouter()
    const { setLoaderBarVisibility } = useContextValues()

    function onErrorImg() {
        setImg(hlp.DEFAULT_PROFILE_IMG)
    }
    function btnViewProfile() {
        setLoaderBarVisibility(1)
        router.push(`/me/${user.slug}`)
    }
    function toggleBtnViewProfileVisibility() {
        setShowViewProfile(showViewProfile == 0 ? 1 : 0)
    }

    useEffect(() => {
        if (user.profilePicture.length > 0) {
            setImg(`${hlp.BACKEND_HOST}/pictures/${user.profilePicture}`)
        } else {
            setImg(hlp.DEFAULT_PROFILE_IMG)
        }
    }, [user])

    return (
        <ContainerItemMoreStarred
            showViewProfile={showViewProfile}
            onClick={toggleBtnViewProfileVisibility}
            className={className}
        >
            <div id='viewProfile' onClick={() => setShowViewProfile(0)}>
                <ButtonOne text='View Profile' onClick={btnViewProfile} />
            </div>

            <div id='picturePortStars'>
                <div id='profilePicture'>
                    <img alt={user.name} src={img} onError={onErrorImg} />
                </div>
                <div id='portfoliosAndStars'>
                    <div>
                        <WorkIcon />
                        <p>
                            {user.portfoliosAmount >= 1
                                ? user.portfoliosAmount
                                : 0}
                        </p>
                    </div>
                    &nbsp;|&nbsp;
                    <div>
                        <StarsIcon />
                        <p>{user.stars ? user.stars.length : 0}</p>
                    </div>
                </div>
            </div>

            <div id='infos'>
                <p id='name'>{user.name}</p>
                <div id='address'>
                    <MapIcon />
                    <p>{user.city ? `${user.city}` : ' ? , '}</p>
                    <p>{user.state ? `, ${user.state} ` : ' ? '}</p>
                    <p>{user.country ? ` - ${user.country}` : ' '}</p>
                </div>
            </div>

            <div id='bio'>
                <p>"{user.bio}"</p>
            </div>
        </ContainerItemMoreStarred>
    )
}
