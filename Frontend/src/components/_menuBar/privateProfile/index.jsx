/** Components */
import SmallWindow from '../../layouts/smallWindowModel'
import ActionButtons from '../../layouts/smallWindowModel/actionButtonsArea'
import {
    ProgressBarContainer,
    ProfileOverview2,
    Followers,
    EditIcon,
    StarsIcon
} from './styles'
import CloseButton from '../../buttons/closeButtonIcon'
import ButtonOne from '../../buttons/buttonOne'

/** Dependencies */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useContextValues } from '../../../context'
import hlp from '../../../helpers'
import DropzoneEditPicture from '../../dropzone/editProfilePicture'
import reqLogout from '../../../services/reqLogout'

/**Start component */
export default function LogginWindow() {
    const [profilePicture, setProfilePicture] = useState(
        hlp.DEFAULT_PROFILE_IMG
    )

    const {
        privateProfileVisibility,
        setPrivateProfileVisibility,
        setEditProfileVisibility,
        session,
        setSession,
        authenticated,
        setAuthenticated,
        setLoaderBarVisibility
    } = useContextValues()

    const router = useRouter()

    function btnNewPortfolio() {
        setLoaderBarVisibility(1)
        setPrivateProfileVisibility(0)
        router.push('/portfolio/add')
    }

    function viewProfileClickAction() {
        setPrivateProfileVisibility(false)
        setLoaderBarVisibility(1)
        router.push(`/me/${session.user.slug}`)
    }

    function editProfileClickAction() {
        setEditProfileVisibility(true)
        setPrivateProfileVisibility(false)
    }

    function logoutClickAction() {
        reqLogout(session.accessToken)
        setSession(hlp.EMPTY_SESSION)
        setAuthenticated(false)
        setPrivateProfileVisibility(false)
    }

    useEffect(() => {
        if (authenticated) {
            if (session.user.profilePicture) {
                setProfilePicture(
                    `${hlp.BACKEND_HOST}/pictures/${session.user.profilePicture}`
                )
            }
        }
    })

    return (
        <SmallWindow className={privateProfileVisibility ? '' : 'displayNone'}>
            {/* <ProgressBarContainer>
                <div className='progress-bar-value' style={{ width: '10%' }} />
                <div
                    className='progress-percentage'
                    style={{ paddingLeft: `${10 - 3}%` }}
                >
                    <span>▲</span>
                    <span>10%</span>
                </div>
            </ProgressBarContainer> */}

            <ProfileOverview2>
                <div className='profile-image-container'>
                    <img src={profilePicture} />
                    <div className='edit-picture'>
                        <DropzoneEditPicture />
                    </div>
                </div>

                <p>{session.user.name}</p>

                <div className='view-edit-profile'>
                    <ButtonOne
                        text='View profile'
                        onClick={viewProfileClickAction}
                    />

                    <EditIcon onClick={editProfileClickAction} />
                </div>
            </ProfileOverview2>

            <Followers>
                <StarsIcon /> <p>{session.user.stars.length}</p>
            </Followers>

            <ActionButtons>
                <ButtonOne text='Logout' onClick={logoutClickAction} />

                <ButtonOne text='New Portfolio' onClick={btnNewPortfolio} />
            </ActionButtons>
        </SmallWindow>
    )
}
