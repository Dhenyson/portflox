import {
    ContainerEditProfile,
    EditIcon,
    LinkedinIcon,
    GithubIcon,
    YoutubeIcon,
    InstagramIcon,
    TwitterIcon,
    EyeShowIcon
} from './styles'
import ButtonOne from '../../../buttons/buttonOne'
import Modal from '../../../modal'
import SelectWithTags from '../../../selectWithTags'

import { useContextValues } from '../../../../context'
import reqUpdateProfile from '../../../../services/reqUpdateProfile'
import reqUpdateEmail from '../../../../services/reqUpdateEmail'
import reqResendConfirmEmail from '../../../../services/reqResendConfirmEmail'
import reqChangePassword from '../../../../services/reqChangePassword'
import countryList from '../../../../helpers/countryList'
import createListStates from '../../../../utils/createListStates'
import updateLocalSession from '../../../../utils/updateLocalSession'

import { useState, useEffect, useRef } from 'react'
import { set } from 'lodash'

export default function EditProfile() {
    const [name, setName] = useState('')
    const [birth, setBirth] = useState('')
    const [situation, setSituation] = useState('')
    const [local, setLocal] = useState('')
    const [country, setCountry] = useState('')
    const [stateAddress, setStateAddress] = useState('')
    const [city, setCity] = useState('')
    const [slug, setSlug] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [github, setGithub] = useState('')
    const [youtube, setYoutube] = useState('')
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [emailVerification, setEmailVerification] = useState(false)

    const [editCountry, setEditCountry] = useState(0)
    const [editState, setEditState] = useState(0)

    const [modalEmailVisibility, setModalEmailVisibility] = useState(0)
    const [modalPasswordVisibility, setModalPasswordVisibility] = useState(0)
    const [typeInputPassword, setTypeInputPassword] = useState('password')
    const [inputPassword, setInputPassword] = useState('')
    const [inputPasswordEmail, setInputPasswordEmail] = useState('')
    const [inputEmail, setInputEmail] = useState('')
    const [inputNewPassword, setInputNewPassword] = useState('')
    const [inputNewPasswordR, setInputNewPasswordR] = useState('')

    const [textAreaHeight, setTextAreaHeight] = useState('40px')
    const textArea = useRef()

    function toggleTypeInputPassword() {
        setTypeInputPassword(
            typeInputPassword == 'password' ? 'text' : 'password'
        )
    }
    function btnCancelChangePassword() {
        setModalPasswordVisibility(0)
        setModalEmailVisibility(0)
        setInputPassword('')
        setInputNewPassword('')
        setInputNewPasswordR('')
        setInputPasswordEmail('')
        setInputEmail('')
    }

    const {
        editProfileVisibility,
        setPrivateProfileVisibility,
        setEditProfileVisibility,
        session,
        setSession,
        showFlashMsg,
        setLoaderBarVisibility
    } = useContextValues()

    const countries = countryList()

    function handleInputBirth(e) {
        let text = e.target.value.replace(/[^0-9\/]/g, '')

        // Disallow typing '/' if condition is true
        let allowedSizes = [2, 3, 5, 6]
        if (
            text.length > birth.length &&
            text[text.length - 1] === '/' &&
            !allowedSizes.includes(text.length)
        ) {
            text = text.substring(0, text.length - 1)
        }

        // Add '0' before if date there is only one number and '/' has been added
        if (
            text.length > birth.length &&
            text[text.length - 1] === '/' &&
            birth.length === 1
        ) {
            text = 0 + text
            setBirth(text)
            return
        }

        // Add '0' before if date there is only four number and '/' has been added
        if (
            text.length > birth.length &&
            text[text.length - 1] === '/' &&
            birth.length === 4
        ) {
            text = text[0] + text[1] + text[2] + 0 + text[3] + '/'
            setBirth(text)
            return
        }

        // Update birth if birth length is less than 10
        if (text.length <= birth.length || birth.length < 10) {
            setBirth(text)
        }

        if (text.length > birth.length && birth.length === 1) {
            setBirth(text + '/')
            console.log('2')
            return
        }
        if (text.length > birth.length && birth.length === 4) {
            setBirth(text + '/')
            return
        }
    }

    function handleKeyInputBirth(e) {
        // console.log(e.keyCode)
        // if (e.keyCode === 8) {
        //     setBirth(birth.substring(0, birth.length - 1))
        // }
        // if (e.keyCode === 46) {
        //     setBirth('')
        // }
        // if (e.keyCode === 111 && birth.length === 1) {
        //     setBirth(0 + birth + '/')
        // }
        // if (e.keyCode === 111 && birth.length === 4) {
        //     setBirth(birth[0] + birth[1] + birth[2] + 0 + birth[3] + '/')
        // }
        // if (
        //     (birth.length <= 9 && e.keyCode > 95 && e.keyCode < 106) ||
        //     (birth.length <= 9 && e.keyCode > 47 && e.keyCode < 58)
        // ) {
        //     if (birth.length == 1 || birth.length == 4) {
        //         setBirth(birth + e.key + '/')
        //     } else {
        //         setBirth(birth + e.key)
        //     }
        // }
    }

    function updateStatesWithLocalSession() {
        setName(session.user.name)
        setBirth(session.user.birth)
        setSituation(session.user.situation)
        setLocal(session.user.local)
        setCity(session.user.city)
        setStateAddress(session.user.state)
        setCountry(session.user.country)
        setSlug(session.user.slug)
        setEmail(session.user.email)
        setBio(session.user.bio)
        setLinkedin(session.user.linkedin)
        setGithub(session.user.github)
        setTwitter(session.user.twitter)
        setYoutube(session.user.youtube)
        setInstagram(session.user.instagram)
        setEmailVerification(session.user.emailVerification)
    }

    function cancelClickAction() {
        updateStatesWithLocalSession()
        setPrivateProfileVisibility(false)
        setEditProfileVisibility(false)
    }

    function keyEnterAnction(e) {
        if (e.charCode == 13) {
            saveClickAction()
        }
    }

    async function saveClickAction() {
        setLoaderBarVisibility(1)
        let splitBirth = birth.split('/')
        let newBirth = splitBirth[2] + '/' + splitBirth[1] + '/' + splitBirth[0]

        const response = await reqUpdateProfile(
            session.accessToken,
            name,
            newBirth,
            situation,
            local,
            city,
            stateAddress,
            country,
            slug,
            bio,
            linkedin,
            github,
            youtube,
            instagram,
            twitter
        )
        setLoaderBarVisibility(0)

        if (response.status == 'success') {
            setSession(response)
            updateLocalSession(response)
            setEditProfileVisibility(false)
            setEditCountry(0)
            setEditState(0)
        }
        showFlashMsg(response.status, 5, response.msg)
    }

    async function btnChangePassword() {
        if (inputNewPassword != inputNewPasswordR) {
            showFlashMsg('error', 5, 'Passwords do not match')
        } else {
            setLoaderBarVisibility(1)
            const response = await reqChangePassword(
                session.accessToken,
                inputPassword,
                inputNewPassword
            )
            setLoaderBarVisibility(0)

            if (response.status) {
                showFlashMsg(response.status, 5, response.msg)
                if (response.status == 'success') {
                    setSession(response)
                    updateLocalSession(response)
                    setModalPasswordVisibility(0)
                    setInputPassword('')
                    setInputNewPassword('')
                    setInputNewPasswordR('')
                }
            }
        }
    }
    async function resendEmailConfirmation() {
        setLoaderBarVisibility(1)
        const response = await reqResendConfirmEmail(session.accessToken)
        setLoaderBarVisibility(0)

        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)
        }
    }
    async function btnChangeEmail() {
        setLoaderBarVisibility(1)
        const response = await reqUpdateEmail(
            session.accessToken,
            inputEmail,
            inputPasswordEmail
        )
        setLoaderBarVisibility(0)

        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)
            if (response.status == 'success') {
                setSession(response)
                updateLocalSession(response)
                setModalEmailVisibility(0)
                setInputEmail('')
                setInputPasswordEmail('')
            }
        }
    }

    /** Update states and fields with Local Session info */
    useEffect(() => {
        updateStatesWithLocalSession()
    }, [session])

    /** Update height of textarea (bio) */
    useEffect(() => {
        setTextAreaHeight(`${textArea.current.scrollHeight}px`)
    })

    return (
        <Modal
            visibility={editProfileVisibility ? 1 : 0}
            bgClick={cancelClickAction}
        >
            <ContainerEditProfile
                className={editProfileVisibility == 1 ? '' : 'displayNone'}
            >
                <h3>Edit profile</h3>

                <form action='' method='POST'>
                    <section id='nameAndAge'>
                        <div id='fullName'>
                            <label className='label'>Full name</label>
                            <input
                                className='inputDefault'
                                type='text'
                                name='name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyPress={keyEnterAnction}
                                placeholder='Ex.: Dhenyson Jhean G. Silva'
                                required
                            />
                        </div>

                        <div id='birth'>
                            <label className='label'>Birth (DD/MM/YYYY)</label>
                            <input
                                className='inputDefault'
                                type='text'
                                name='occupation'
                                value={birth}
                                onChange={handleInputBirth}
                                onKeyDown={handleKeyInputBirth}
                                placeholder='Ex.: 1995/03/27'
                            />
                        </div>
                    </section>

                    <section id='situationAndLocal'>
                        <div>
                            <label className='label'>Situation</label>
                            <input
                                className='inputDefault'
                                type='text'
                                name='situation'
                                value={situation}
                                onChange={e => setSituation(e.target.value)}
                                onKeyPress={keyEnterAnction}
                                placeholder='Ex.: working, studying, retiree...'
                            />
                        </div>

                        <div>
                            <label className='label'>Local</label>
                            <input
                                className='inputDefault'
                                type='text'
                                name='local'
                                value={local}
                                onChange={e => setLocal(e.target.value)}
                                onKeyPress={keyEnterAnction}
                                placeholder='Ex.: Havard, Rocketseat, Google, From Home...'
                            />
                        </div>
                    </section>

                    <section id='address'>
                        <div id='country'>
                            <label className='label'>Country</label>
                            {country.length >= 1 && editCountry == 0 ? (
                                <div className='currentAddress'>
                                    <p>{country}</p>
                                    <EditIcon
                                        onClick={() => setEditCountry(1)}
                                    />
                                </div>
                            ) : (
                                <SelectWithTags
                                    className='selectDefault'
                                    options={countries}
                                    initialTag={session.user.country}
                                    onChange={v => setCountry(v)}
                                    objFields={{ text: 'name', value: 'name' }}
                                    returnString
                                    placeholder='Select country'
                                    singleTag
                                    tagStyle={2}
                                />
                            )}
                        </div>

                        <div id='state'>
                            <label className='label'>State</label>
                            {stateAddress.length >= 1 && editState == 0 ? (
                                <div className='currentAddress'>
                                    <p>{stateAddress}</p>
                                    <EditIcon onClick={() => setEditState(1)} />
                                </div>
                            ) : (
                                <SelectWithTags
                                    className='selectDefault'
                                    options={createListStates(country)}
                                    value={stateAddress}
                                    onChange={v => setStateAddress(v)}
                                    placeholder='Select state'
                                    returnString
                                    singleTag
                                    noStyle
                                    tagStyle={2}
                                    off={country.length <= 0 ? 1 : 0}
                                />
                            )}
                        </div>

                        <div id='city'>
                            <div id='city'>
                                <label className='label'>City</label>
                                <input
                                    className='inputDefault'
                                    type='text'
                                    name='city'
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    onKeyPress={keyEnterAnction}
                                    placeholder='Ex.: Recife, New York, Toquio...'
                                    disabled={stateAddress.length <= 0 ? 1 : 0}
                                />
                            </div>
                        </div>
                    </section>

                    <section id='url'>
                        <div>
                            <label className='label'>URL</label>
                            <div className='group'>
                                <div className='preInput'>
                                    {'https://sharefolios/'}
                                </div>
                                <input
                                    className='inputTwo'
                                    type='text'
                                    name='slug'
                                    value={slug}
                                    onChange={e => setSlug(e.target.value)}
                                    onKeyPress={keyEnterAnction}
                                    placeholder='Ex.: dhenyson, diego, mayk...'
                                />
                            </div>
                        </div>
                    </section>

                    <section id='aboutMe'>
                        <div>
                            <label className='label'>About me</label>
                            <textarea
                                ref={textArea}
                                className='inputDefault'
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                placeholder='Tell about yourself'
                                style={{
                                    height: `${textAreaHeight}`,
                                    minHeight: '40px',
                                    maxHeight: '250px'
                                }}
                            />
                        </div>
                    </section>

                    <section id='emailAndPswd'>
                        <Modal
                            visibility={modalEmailVisibility}
                            bgClick={() => setModalEmailVisibility(0)}
                        >
                            <div className='modalPassword'>
                                <p>Change Email</p>

                                <div className='inputArea'>
                                    <input
                                        type='email'
                                        placeholder='New E-mail'
                                        value={inputEmail}
                                        onChange={e =>
                                            setInputEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className='inputArea'>
                                    <input
                                        type={typeInputPassword}
                                        placeholder='Confirm password'
                                        id='firstInput'
                                        value={inputPasswordEmail}
                                        onChange={e =>
                                            setInputPasswordEmail(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <EyeShowIcon
                                        onClick={toggleTypeInputPassword}
                                    />
                                </div>

                                <div className='buttonsModal'>
                                    <ButtonOne
                                        type={2}
                                        text='CANCEL'
                                        id='button'
                                        onClick={btnCancelChangePassword}
                                    />
                                    <ButtonOne
                                        text='SAVE'
                                        id='button'
                                        onClick={btnChangeEmail}
                                    />
                                </div>
                            </div>
                        </Modal>
                        <div>
                            <label className='label'>
                                Email
                                {emailVerification == false && (
                                    <p className='emailNotConfirmed'>
                                        &nbsp;(Email not confirmed)
                                    </p>
                                )}
                            </label>
                            <div
                                className='fieldButton'
                                onClick={() => setModalEmailVisibility(1)}
                            >
                                {email}
                            </div>
                            {emailVerification == false && (
                                <p
                                    className='resendLink'
                                    onClick={resendEmailConfirmation}
                                >
                                    Resend confirmation link
                                </p>
                            )}
                        </div>

                        <Modal
                            visibility={modalPasswordVisibility}
                            bgClick={() => setModalPasswordVisibility(0)}
                        >
                            <div className='modalPassword'>
                                <p>Change Password</p>
                                <div className='inputArea'>
                                    <input
                                        type={typeInputPassword}
                                        placeholder='Confirm password'
                                        id='firstInput'
                                        value={inputPassword}
                                        onChange={e =>
                                            setInputPassword(e.target.value)
                                        }
                                    />
                                    <EyeShowIcon
                                        onClick={toggleTypeInputPassword}
                                    />
                                </div>

                                <div className='inputArea'>
                                    <input
                                        type={typeInputPassword}
                                        placeholder='New password'
                                        value={inputNewPassword}
                                        onChange={e =>
                                            setInputNewPassword(e.target.value)
                                        }
                                    />
                                    <EyeShowIcon
                                        onClick={toggleTypeInputPassword}
                                    />
                                </div>

                                <div className='inputArea'>
                                    <input
                                        type={typeInputPassword}
                                        placeholder='Repeat new password'
                                        value={inputNewPasswordR}
                                        onChange={e =>
                                            setInputNewPasswordR(e.target.value)
                                        }
                                    />
                                    <EyeShowIcon
                                        onClick={toggleTypeInputPassword}
                                    />
                                </div>

                                <div className='buttonsModal'>
                                    <ButtonOne
                                        type={2}
                                        text='CANCEL'
                                        id='button'
                                        onClick={btnCancelChangePassword}
                                    />
                                    <ButtonOne
                                        text='SAVE'
                                        id='button'
                                        onClick={btnChangePassword}
                                    />
                                </div>
                            </div>
                        </Modal>
                        <div onClick={() => setModalPasswordVisibility(1)}>
                            <label className='label'>Password</label>
                            <div className='fieldButton'>**********</div>
                        </div>
                    </section>

                    <section id='social'>
                        <div className='socialField'>
                            <div className='group'>
                                <div className='preInput'>
                                    <LinkedinIcon /> linkedin.com/in/
                                </div>
                                <input
                                    className='inputTwo'
                                    type='text'
                                    name='linkedin'
                                    value={linkedin}
                                    onChange={e => setLinkedin(e.target.value)}
                                    onKeyPress={keyEnterAnction}
                                    placeholder='Only username. Ex.: dhenyson, diego, mayk...'
                                />
                            </div>
                        </div>
                        <div className='socialField'>
                            <div className='group'>
                                <div className='preInput'>
                                    <TwitterIcon />
                                    twitter.com/
                                </div>
                                <input
                                    className='inputTwo'
                                    type='text'
                                    name='slug'
                                    value={twitter}
                                    onChange={e => setTwitter(e.target.value)}
                                    onKeyPress={keyEnterAnction}
                                    placeholder='Only username. Ex.: dhenyson, diego, mayk...'
                                />
                            </div>
                        </div>
                        <div className='socialField'>
                            <div className='group'>
                                <div className='preInput'>
                                    <InstagramIcon />
                                    instagram.com/
                                </div>
                                <input
                                    className='inputTwo'
                                    type='text'
                                    name='instagram'
                                    value={instagram}
                                    onChange={e => setInstagram(e.target.value)}
                                    onKeyPress={keyEnterAnction}
                                    placeholder='Only username. Ex.: dhenyson, diego, mayk...'
                                />
                            </div>
                        </div>
                        <div className='socialField'>
                            <div className='group'>
                                <div className='preInput'>
                                    <YoutubeIcon /> youtube.com/channel/
                                </div>
                                <input
                                    className='inputTwo'
                                    type='text'
                                    name='Youtube'
                                    value={youtube}
                                    onChange={e => setYoutube(e.target.value)}
                                    onKeyPress={keyEnterAnction}
                                    placeholder='Only username. Ex.: dhenyson, diego, mayk...'
                                />
                            </div>
                        </div>
                        <div className='socialField'>
                            <div className='group'>
                                <div className='preInput'>
                                    <GithubIcon />
                                    github.com/
                                </div>
                                <input
                                    className='inputTwo'
                                    type='text'
                                    name='Github'
                                    value={github}
                                    onChange={e => setGithub(e.target.value)}
                                    onKeyPress={keyEnterAnction}
                                    placeholder='Only username. Ex.: dhenyson, diego, mayk...'
                                />
                            </div>
                        </div>
                    </section>
                </form>

                <div className='actionButtons'>
                    <ButtonOne
                        text='Cancel'
                        onClick={cancelClickAction}
                        type={2}
                    />

                    <ButtonOne text='Save' onClick={saveClickAction} />
                </div>
            </ContainerEditProfile>
        </Modal>
    )
}
