import {
    WrapperUserProfile,
    ContainerUserProfile,
    MapIcon,
    LinkedinIcon,
    GithubIcon,
    YoutubeIcon,
    InstagramIcon,
    TwitterIcon,
    ExpandLessIcon,
    ExpandMoreIcon,
    EmptyFeed,
    SearchIcon,
    ListSettingsIcon,
    StarIcon,
    StarBorderIcon,
    StarsIcon,
    StarAddIcon,
    ArrowDownUpIcon,
    EditIcon
} from './styles'
import MenuBar from '../_menuBar'
import ButtonOne from '../buttons/buttonOne'
import Portfolios from '../portfolioCard'
import MenuSelect from '../MenuSelect'
import Modal from '../modal'
import UserProfileImg from '../userProfileImg'
import Starreds from './Starreds'
import Head from '../../helpers/head'

import hlp from '../../helpers'
import menuSelectOptions from '../../helpers/menuSelectOptions'
import handleStarred from '../../utils/handleStarred'
import filterPortfolios from '../../utils/filterPortfolios'
import DropzoneEditPicture from '../dropzone/editProfilePicture'

import reqToggleStarred from '../../services/reqToggleStarred'

import { useContextValues } from '../../context'

import { useState, useEffect } from 'react'

export default function Layout(props) {
    const [portfolios, setPortfolios] = useState(props.portfolios)
    const [urlPicture, setUrlPicture] = useState(hlp.DEFAULT_PROFILE_IMG)
    const [aboutMeExpanded, setAboutMeExpanded] = useState(false)
    const [accountOwner, setAccountOwner] = useState(false)
    const [starredList, setStarredList] = useState(props.user.stars)
    const [alreadyStarred, setAlreadyStarred] = useState(false)
    const [showModalStarred, setShowModalStarred] = useState(0)

    const [filterAreaVisibility, setFilterAreaVisibility] = useState(true)
    const [inputTags, setInputTags] = useState('')
    const [tags, setTags] = useState([])
    const [category, setCategory] = useState('All categories')
    const [anyTag, setAnytag] = useState(true)
    const [sort, setSort] = useState('updateDate')

    const {
        windowOrModalOpen,
        session,
        showFlashMsg,
        setLoaderBarVisibility,
        setEditProfileVisibility
    } = useContextValues()

    const { categoryOptions, tagsOptions, orderByOption } = menuSelectOptions()

    function closeModalStarred() {
        setShowModalStarred(0)
    }

    function btnEditProfile() {
        setEditProfileVisibility(1)
    }
    function clickActionStarreds() {
        if (starredList.length >= 1) {
            setShowModalStarred(1)
        }
    }

    function handleInputTags(e) {
        let text = e.target.value
            .replace(/^,{1,}|^\s{1,}/g, '')
            .replace(/,{2,}|\s,|,\s,/g, ',')
            .replace(/\s{2,}/g, ' ')
            .toLowerCase()

        setInputTags(text)
    }
    function handleSetArrayTags(e) {
        if (e.charCode == 13) {
            let text = inputTags
                .replace(/,\s{1,}/g, ',')
                .replace(/,\s{1,}$|,$|\s$/g, '')

            setTags(text.split(','))
        }
    }
    function handleCategory(e) {
        setCategory(e.target.value)
    }
    function handleAnyTag(e) {
        if (e.target.value == 'any') {
            setAnytag(true)
        } else {
            setAnytag(false)
        }
    }
    function handleSort(e) {
        setSort(e.target.value)
    }
    function reverseList() {
        let newList = [...portfolios]
        setPortfolios(newList.reverse())
    }

    function toggleAboutMeExpansion() {
        setAboutMeExpanded(aboutMeExpanded ? false : true)
    }
    function toggleFilterAreaVisibility() {
        setFilterAreaVisibility(filterAreaVisibility ? false : true)
    }
    function backToTopAction() {
        window.scrollTo(0, 0)
    }
    function onErrorPicture() {
        setUrlPicture(hlp.DEFAULT_PROFILE_IMG)
    }
    function noSocial() {
        if (
            props.user.linkedin.length === 0 &&
            props.user.github.length === 0 &&
            props.user.youtube.length === 0 &&
            props.user.instagram.length === 0 &&
            props.user.twitter.length === 0
        ) {
            return true
        } else {
            return false
        }
    }
    function noAddress() {
        if (
            props.user.city.length === 0 &&
            props.user.state.length === 0 &&
            props.user.country.length === 0
        ) {
            return true
        } else {
            return false
        }
    }

    async function starButtonAction() {
        if (session.accessToken) {
            setAlreadyStarred(alreadyStarred ? false : true)
            setLoaderBarVisibility(1)
            const result = await reqToggleStarred(
                session.accessToken,
                props.user.slug
            )
            setLoaderBarVisibility(0)

            const newStarredList = handleStarred(starredList, session.user)
            setStarredList(newStarredList)

            showFlashMsg(result.status, 5, result.msg)
        } else {
            showFlashMsg('error', 5, 'You are not logged in')
        }
    }

    /** Activate filter */
    useEffect(() => {
        let options = {
            tags: tags,
            category: category,
            anyTag: anyTag,
            sort: sort
        }
        setPortfolios(filterPortfolios(props.portfolios, options))
    }, [category, anyTag, sort, tags])

    /** It monitors if the input of the tags is empty, if so, delete the filters */
    useEffect(() => {
        if (inputTags.length <= 0) {
            setTags([])
        }
    }, [inputTags])

    /** updates the state's of starred*/
    useEffect(() => {
        setStarredList(props.user.stars)
        if (props.user.profilePicture.length > 0) {
            setUrlPicture(
                `${hlp.BACKEND_HOST}/pictures/${props.user.profilePicture}`
            )
        } else {
            setUrlPicture('hlp.DEFAULT_PROFILE_IMG')
        }
    }, [props.user.stars])

    /** Check if has already given a star */
    useEffect(() => {
        function starredVerify() {
            if (session.user.id) {
                var already = false
                starredList.map(item => {
                    if (item._id == session.user.id) {
                        already = true
                        setAlreadyStarred(true)
                    }
                    if (!already) {
                        setAlreadyStarred(false)
                    }
                })
            }
        }
        starredVerify()
    }, [session])

    /** Check if you are the owner of the account, if so, remove the star button */
    useEffect(() => {
        function checkAccountOwner() {
            if (session.user.id) {
                if (session.user.slug == props.user.slug) {
                    setAccountOwner(true)
                }
            }
        }
        return checkAccountOwner()
    }, [session])

    /** Close modal when load profile */
    useEffect(() => {
        closeModalStarred()
    }, [props.user.stars])

    useEffect(() => {
        setLoaderBarVisibility(0)
    }, [props.user])

    return (
        <WrapperUserProfile>
            <title>{props.user.name}</title>
            <Head
                url={
                    typeof window !== 'undefined'
                        ? window.location.href
                        : hlp.FRONTEND_HOST
                }
                title={props.user.name}
                description={props.user.bio}
                image={
                    props.user.profilePicture.length >= 1
                        ? `${hlp.BACKEND_HOST}/pictures/${props.user.profilePicture}`
                        : 'https://www.portflox.com/images/banner.jpg'
                }
            />
            <MenuBar />

            <ContainerUserProfile
                noScroll={windowOrModalOpen() ? 1 : 0}
                noSocial={noSocial() ? 1 : 0}
                noAddress={noAddress() ? 1 : 0}
                noFilter={filterAreaVisibility ? 1 : 0}
                accountOwner={accountOwner ? 1 : 0}
            >
                <Modal
                    visibility={showModalStarred}
                    bgClick={closeModalStarred}
                    className='modal-starred'
                >
                    <Starreds
                        closeButton={closeModalStarred}
                        users={starredList}
                    />
                </Modal>

                <aside>
                    <div id='perfil'>
                        {session.user.id === props.user._id && (
                            <span
                                className='editPerfil'
                                onClick={btnEditProfile}
                            >
                                <EditIcon />
                            </span>
                        )}

                        <div className='containerProfileImg'>
                            <img
                                src={urlPicture}
                                className='picture'
                                onError={onErrorPicture}
                            />
                            {session.user.id === props.user._id && (
                                <div className='edit-picture'>
                                    <DropzoneEditPicture />
                                </div>
                            )}
                        </div>

                        <h1>{props.user.name}</h1>

                        <section>
                            <div
                                id='expandable'
                                className={
                                    aboutMeExpanded ? 'expanded' : 'unexpanded'
                                }
                            >
                                <p>{props.user.bio}</p>
                            </div>

                            <div>
                                {aboutMeExpanded ? (
                                    <ExpandLessIcon
                                        onClick={toggleAboutMeExpansion}
                                    />
                                ) : (
                                    <ExpandMoreIcon
                                        onClick={toggleAboutMeExpansion}
                                    />
                                )}
                            </div>

                            <span>
                                <MapIcon />
                                <span />
                                <p id='address'>
                                    {`${props.user.city} - ${props.user.state}, ${props.user.country}`}
                                </p>
                            </span>
                        </section>
                    </div>

                    <div id='social'>
                        {noSocial() && (
                            <p id='noSocial'>No social network added</p>
                        )}
                        {props.user.linkedin && (
                            <a
                                href={`https://www.linkedin.com/in/${props.user.linkedin}`}
                                target='_blank'
                            >
                                <LinkedinIcon alt='Linkedin' />
                            </a>
                        )}
                        {props.user.github && (
                            <a
                                href={`https://github.com/${props.user.github}`}
                                target='_blank'
                            >
                                <GithubIcon alt='Github' />
                            </a>
                        )}

                        {props.user.youtube && (
                            <a
                                href={`https://youtube.com/channel/${props.user.youtube}`}
                                target='_blank'
                            >
                                <YoutubeIcon alt='Youtube' />
                            </a>
                        )}
                        {props.user.instagram && (
                            <a
                                href={`https://instagram.com/${props.user.instagram}`}
                                target='_blank'
                            >
                                <InstagramIcon alt='Instagram' />
                            </a>
                        )}
                        {props.user.twitter && (
                            <a
                                href={`https://twitter.com/${props.user.twitter}`}
                                target='_blank'
                            >
                                <TwitterIcon alt='Twitter' />
                            </a>
                        )}
                    </div>

                    <div id='stars'>
                        <div id='starredInfo'>
                            <ul id='starredList' onClick={clickActionStarreds}>
                                <span id='starredAmount'>
                                    <StarsIcon />
                                    {starredList.length == 0 && 0}
                                </span>
                                {starredList.slice(0, 5).map((item, index) => (
                                    <li>
                                        <UserProfileImg
                                            user={item}
                                            key={index}
                                        />
                                    </li>
                                ))}
                            </ul>

                            {starredList.length > 5 && (
                                <div
                                    id='moreStarreds'
                                    onClick={() => setShowModalStarred(1)}
                                >
                                    +{starredList.length - 5}
                                    <StarAddIcon />
                                </div>
                            )}
                        </div>
                        <div id='starredButton'>
                            <ButtonOne
                                onClick={starButtonAction}
                                text={alreadyStarred ? 'Starred ' : 'Star'}
                                visibility={accountOwner}
                            >
                                {alreadyStarred ? (
                                    <StarIcon />
                                ) : (
                                    <StarBorderIcon />
                                )}
                            </ButtonOne>
                        </div>
                    </div>
                </aside>

                <main>
                    <section id='filter'>
                        <span id='filterHeader'>
                            <h1>Portfolios</h1>

                            <span id='expandProfile' onClick={backToTopAction}>
                                <ExpandMoreIcon id='iconExpand' />

                                <div id='pictureIconArea'>
                                    <img src={urlPicture} id='pictureIcon' />
                                </div>
                            </span>
                        </span>

                        <div id='input'>
                            <span id='searchIcon'>
                                <SearchIcon />
                            </span>

                            <input
                                type='text'
                                value={inputTags}
                                onChange={handleInputTags}
                                onKeyPress={handleSetArrayTags}
                                placeholder='Ex.: nodejs, react native, reactjs (press Enter)'
                                id='input-search'
                            />
                            <button
                                id='buttonFilter'
                                onClick={toggleFilterAreaVisibility}
                            >
                                <ListSettingsIcon />
                            </button>
                        </div>

                        <div className='filterOptionsWrapper'>
                            <div className='filterOptions'>
                                <MenuSelect
                                    className='select'
                                    options={categoryOptions}
                                    onChange={handleCategory}
                                />
                                <MenuSelect
                                    className='select'
                                    options={tagsOptions}
                                    onChange={handleAnyTag}
                                />
                                <div className='sortBy'>
                                    <MenuSelect
                                        className='select2'
                                        options={orderByOption}
                                        onChange={handleSort}
                                    />
                                    <div id='arrowDownUp' onClick={reverseList}>
                                        <ArrowDownUpIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </section>
                    <div id='portfolios'>
                        {portfolios.length < 1 && (
                            <div id='emptyFeed'>
                                <EmptyFeed />
                                <p>For now it's empty </p>
                            </div>
                        )}
                        {portfolios.map((item, index) => (
                            <Portfolios
                                portfolio={item}
                                local='user'
                                key={index}
                            />
                        ))}
                    </div>
                </main>
            </ContainerUserProfile>
        </WrapperUserProfile>
    )
}
