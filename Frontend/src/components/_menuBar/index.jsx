/** Styles and Components */
import {
    ContainerMenuBar,
    WrapperMenuBar,
    FilterIcon,
    PeopleSearchIcon,
    WorkIcon,
    NotificationsIcon,
    SettingsIcon
} from './styles'
import LoginWindow from './loginWindow'
import RegisterWindow from './registerWindow'
import PrivateProfile from './privateProfile'
import FlashMessage from '../flashMessage'
import BackgroundBlur from '../backgroundBlur'
import EditProfileModal from './privateProfile/editProfile'
import Modal from '../modal'
import ConfigApp from '../ConfigApp'
import Loader from '../loader'

/** Dependencies and essentials methods and functions */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useContextValues } from '../../context'
import updateLocalSession from '../../utils/updateLocalSession'
import hlp from '../../helpers'
import reqLogout from '../../services/reqLogout'

export default function MenuBar(props) {
    /** Context datas */
    const {
        authenticated,
        session,
        privateProfileVisibility,
        setPrivateProfileVisibility,
        loginVisibility,
        setLoginVisibility,
        registerVisibility,
        setRegisterVisibility,
        showFlashMsg,
        setLoaderBarVisibility
    } = useContextValues()

    if (!session.user.name || !session.accessToken || !session.user.stars) {
        updateLocalSession(hlp.EMPTY_SESSION)
    }

    /** Component states */
    const [authMenu, setAuthMenu] = useState(false)
    const [modalSettingVisibility, setModalSettingVisibility] = useState(0)
    const [profilePicture, setProfilePicture] = useState(
        hlp.DEFAULT_PROFILE_IMG
    )

    const router = useRouter()

    function onErrorPicture() {
        setProfilePicture(hlp.DEFAULT_PROFILE_IMG)
    }
    function handleAppClick() {
        showFlashMsg('error', 5, 'Coming soon')
    }

    function btnPortfoliosPage() {
        setLoaderBarVisibility(1)
        router.push('/')
    }
    function btnUsersPage() {
        setLoaderBarVisibility(1)
        router.push('/users')
    }

    function renderMenuButtons() {
        if (props.local == 'main') {
            return (
                <>
                    <div className='btnMenu'>
                        <PeopleSearchIcon onClick={btnUsersPage} />
                    </div>
                    <div className='btnMenu'>
                        <FilterIcon onClick={props.button4} />
                    </div>
                </>
            )
        } else if (props.local == 'users') {
            return (
                <>
                    <div className='btnMenu'>
                        <WorkIcon onClick={btnPortfoliosPage} />
                    </div>
                    <div className='btnMenu'>
                        <FilterIcon onClick={props.button4} />
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='btnMenu'>
                        <PeopleSearchIcon onClick={btnUsersPage} />
                    </div>
                    <div className='btnMenu'>
                        <WorkIcon onClick={btnPortfoliosPage} />
                    </div>
                </>
            )
        }
    }

    function closeModalSetting() {
        setModalSettingVisibility(0)
    }

    /** Handle the click of the profile button */
    async function handleClickProfile() {
        console.log(authMenu)
        if (authenticated) {
            if (privateProfileVisibility) {
                await setPrivateProfileVisibility(false)
            } else {
                await setPrivateProfileVisibility(true)
            }
            setLoginVisibility(false)
        } else {
            if (loginVisibility) {
                setLoginVisibility(false)
            } else {
                setLoginVisibility(true)
            }
            setPrivateProfileVisibility(false)
        }

        if (registerVisibility) {
            setRegisterVisibility(0)
            setLoginVisibility(0)
        }
    }
    /** After rendering the screen, check if the user is authenticated and
     * if so, then render the menu again with the user's data. */
    useEffect(() => {
        if (authenticated) {
            setAuthMenu(true)
            if (session.user.profilePicture.length > 1) {
                setProfilePicture(
                    `${hlp.BACKEND_HOST}/pictures/${session.user.profilePicture}`
                )
            } else {
                setProfilePicture(hlp.DEFAULT_PROFILE_IMG)
            }
        } else {
            setAuthMenu(false)
        }
    })

    useEffect(() => {
        if (session.tokenExpirationDate.length > 1) {
            let tokenDate = new Date(session.tokenExpirationDate).getTime()
            let currentDate = Date.now()

            if (tokenDate < currentDate) {
                showFlashMsg('error', 5, 'Expired token')
                reqLogout(session.accessToken)
            }
        } else {
            updateLocalSession(hlp.EMPTY_SESSION)
        }

        if (session.user.name.length <= 0 || session.accessToken.length <= 0) {
            updateLocalSession(hlp.EMPTY_SESSION)
        }
    }, [])

    /** Component return */
    return (
        <WrapperMenuBar>
            <title>{hlp.APP_NAME}</title>
            <FlashMessage />
            <Loader />
            <BackgroundBlur />

            {!authMenu && <LoginWindow />}
            {!authMenu && <RegisterWindow />}

            {authMenu && <PrivateProfile />}
            {authMenu && <EditProfileModal />}

            <Modal
                style={{ width: '100%', height: '100%' }}
                visibility={modalSettingVisibility}
                bgClick={closeModalSetting}
            >
                <ConfigApp btnClose={closeModalSetting} />
            </Modal>

            <ContainerMenuBar className='ContainerMenuBar'>
                <div className='btnMenu'>
                    <SettingsIcon
                        onClick={() => setModalSettingVisibility(1)}
                    />
                </div>
                <div className='btnMenu'>
                    <NotificationsIcon onClick={handleAppClick} />
                </div>

                <div
                    className='containerProfileImg'
                    onClick={handleClickProfile}
                >
                    <img
                        src={profilePicture}
                        onError={onErrorPicture}
                        className='picture'
                    />
                </div>

                {renderMenuButtons()}
            </ContainerMenuBar>
        </WrapperMenuBar>
    )
}
