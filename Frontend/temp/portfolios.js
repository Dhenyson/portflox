import {
    WrapperPortfolio,
    ContainerPortfolio,
    StarsIcon,
    MapIcon,
    WorkIcon,
    CommentIcon,
    ReportIcon,
    HeartIcon,
    HeartOutlineIcon,
    DeleteForeverIcon,
    EditIcon
} from './styles'
import MenuBar from '../_menuBar'
import ButtonOne from '../buttons/buttonOne'
import ContainterViewImage from './imageView'
import Comments from './comments'
import CommentsPreview from './commentsPreview'
import Support from '../support'
import { MDtextViewer } from '../MDEditor'
import Modal from '../modal'

import hlp from '../../helpers'
import rePortfolioDelete from '../../services/reqPortfolioDelete'
import rePortfolioLike from '../../services/reqPortfolioLike'

import { useContextValues } from '../../context'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Layout({ portfolio }) {
    const [imgSelected, setImgSelected] = useState('')
    const [imgSelectedView, setImgSelectedView] = useState(0)
    const [likes, setLikes] = useState(portfolio.likes.length)
    const [isAuthor, setIsAuthor] = useState(0)
    const [alreadyLiked, setAlreadyLiked] = useState(0)
    const [commentsView, setCommentsView] = useState(0)
    const [modalVisibility, setModalVisibility] = useState(0)
    const [reportData, setReportData] = useState([])
    const [profilePicture, setProfilePicture] = useState(
        hlp.DEFAULT_PROFILE_IMG
    )

    const router = useRouter()

    const { showFlashMsg, session, authenticated, setSupportVisibility } =
        useContextValues()

    /** Função para voltar a imagem de perifl padrão, caso a do user dê erro */
    function onErrorProfilePicture() {
        setProfilePicture(hlp.DEFAULT_PROFILE_IMG)
    }
    function viewImage(slug) {
        setImgSelected(slug)
        setImgSelectedView(1)
    }
    function closeViewImage() {
        setImgSelectedView(0)
    }
    function closeCommentsView() {
        setCommentsView(0)
    }
    function showSupportModal() {
        if (!authenticated) {
            return showFlashMsg('error', 5, 'Login is required')
        }
        setSupportVisibility(1)
    }
    async function deleteButtonAction() {
        const token = session.accessToken
        const portfolioID = portfolio._id
        const response = await rePortfolioDelete(token, portfolioID)

        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)
            if (response.status == 'success') {
                router.back()
            }
        }
    }
    async function likeDislikePortfolio() {
        if (!authenticated) {
            return showFlashMsg('error', 5, 'Login is required')
        }
        if (alreadyLiked == 0) {
            setAlreadyLiked(1)
            setLikes(likes + 1)
        } else {
            setAlreadyLiked(0)
            setLikes(likes - 1)
        }

        const token = session.accessToken
        const portfolioID = portfolio._id
        const response = await rePortfolioLike(token, portfolioID)
        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)
        }
    }

    /** useEffect para atualizar imagem de perfil caso exista */
    useEffect(() => {
        if (portfolio.author.profilePicture.length > 0) {
            setProfilePicture(
                `${hlp.BACKEND_HOST}/pictures/${portfolio.author.profilePicture}`
            )
        }
    }, [])

    /** useEffect to update initial selected img */
    useEffect(() => {
        function updateSelectedImg() {
            if (portfolio.images[0]) {
                setImgSelected(portfolio.images[0])
            }
        }
        return updateSelectedImg()
    }, [])

    /** UseEffect para verificar se o visualizador é o author do portfolio */
    useEffect(() => {
        function setAuthor() {
            if (typeof window !== 'undefined' && localStorage) {
                const response = localStorage.getItem('session')

                if (response) {
                    const viewer = JSON.parse(response)
                    if (
                        viewer.user.id.toString() ==
                        portfolio.author._id.toString()
                    ) {
                        setIsAuthor(1)
                    }
                }
            }
        }
        return setAuthor()
    }, [])

    /** Verifica se o usuario logado já deu like */
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage) {
            const response = localStorage.getItem('session')

            if (response) {
                const viewer = JSON.parse(response)
                if (portfolio.likes.includes(viewer.user.id)) {
                    setAlreadyLiked(1)
                }
            }
        }
    }, [])

    /** Guardar os dados do portfolio caso precise reportar */
    useEffect(() => {
        if (window && window.location) {
            let url = window.location.href
            let portfolioID = portfolio._id
            setReportData({ url, portfolioID })
        }
    }, [])
    return (
        <WrapperPortfolio commentsVisibility={commentsView}>
            <Comments
                visibility={commentsView}
                close={closeCommentsView}
                comments={portfolio.comments}
                portfolioID={portfolio._id}
            />
            <Support type='report portfolio' extra={reportData} />
            <Modal
                visibility={modalVisibility}
                bgClick={() => setModalVisibility(0)}
            >
                <div className='confirmDeleteModal'>
                    <p>Portfolio delete confirmation</p>
                    <div id='buttons'>
                        <ButtonOne
                            id='btn'
                            text='Cancel'
                            onClick={() => setModalVisibility(0)}
                        />
                        <ButtonOne
                            id='btn'
                            text='Confirm'
                            onClick={deleteButtonAction}
                        />
                    </div>
                </div>
            </Modal>

            <ContainerPortfolio>
                <main>
                    <div className='categoryAndTags'>
                        <p className={portfolio.category}>
                            {portfolio.category}
                        </p>
                        <span>
                            {portfolio.tags.map((item, index) => (
                                <p key={index}>{item}</p>
                            ))}
                        </span>
                    </div>

                    <div className='title'>
                        <h1 className={portfolio.category}>
                            {portfolio.title}
                        </h1>
                    </div>

                    <div className='description'>
                        <p>"{portfolio.description}"</p>
                    </div>

                    {portfolio.images.length > 0 && (
                        <div className='images'>
                            <div id='imagesSmall'>
                                {portfolio.images
                                    .slice(0, 5)
                                    .map((img, index) => (
                                        <div id='imagesItems' key={index}>
                                            <img
                                                src={`${hlp.BACKEND_HOST}/images/portfolioImages/${img}`}
                                                onClick={() => viewImage(img)}
                                            />
                                        </div>
                                    ))}
                            </div>
                            <ContainterViewImage
                                slug={imgSelected}
                                visibility={imgSelectedView}
                                onClick={closeViewImage}
                            />
                        </div>
                    )}

                    <div className='content'>
                        <MDtextViewer value={portfolio.body} />
                    </div>
                </main>

                <aside>
                    <div className='author'>
                        <div id='profilePicture'>
                            <img
                                src={profilePicture}
                                onError={onErrorProfilePicture}
                                // src={`${hlp.BACKEND_HOST}/pictures/${portfolio.author.profilePicture}`}
                            />
                        </div>

                        <p id='name'>{portfolio.author.name}</p>

                        <div id='address'>
                            <MapIcon /> {portfolio.author.city},{' '}
                            {portfolio.author.state}-{portfolio.author.country}
                        </div>

                        <div id='stars'>
                            <WorkIcon />
                            &nbsp; {portfolio.author.portfolios.length}
                            &nbsp;|&nbsp;
                            <StarsIcon />
                            &nbsp; {portfolio.author.stars.length}
                        </div>

                        <div id='buttonProfile'>
                            <ButtonOne
                                text='View Profile'
                                onClick={() =>
                                    router.push(`/me/${portfolio.author.slug}`)
                                }
                            />
                        </div>
                    </div>

                    <div className='likes'>
                        {isAuthor == 1 ? (
                            <ButtonOne
                                text='Delete'
                                onClick={() => setModalVisibility(1)}
                            >
                                <DeleteForeverIcon />
                            </ButtonOne>
                        ) : (
                            <ButtonOne text='Report' onClick={showSupportModal}>
                                <ReportIcon />
                            </ButtonOne>
                        )}

                        <p id='amountLikes'>
                            <HeartIcon />
                            &nbsp;
                            {likes}
                        </p>

                        {isAuthor == 1 ? (
                            <ButtonOne text='Edit'>
                                <EditIcon />
                            </ButtonOne>
                        ) : (
                            <ButtonOne
                                text={alreadyLiked == 0 ? 'Like' : 'Liked'}
                                onClick={likeDislikePortfolio}
                            >
                                {alreadyLiked == 0 ? (
                                    <HeartOutlineIcon />
                                ) : (
                                    <HeartIcon />
                                )}
                            </ButtonOne>
                        )}
                    </div>

                    <div className='comments'>
                        {portfolio.comments.length <= 0 && (
                            <h1>
                                0 <CommentIcon />
                            </h1>
                        )}

                        {portfolio.comments.slice(0, 3).map((item, index) => (
                            <div id='commentItemPreview' key={index}>
                                <CommentsPreview comment={item} lineLimit={1} />
                            </div>
                        ))}

                        {portfolio.comments.length > 3 && (
                            <p id='amount'>
                                +{portfolio.comments.length - 3}&nbsp;
                                <CommentIcon />
                            </p>
                        )}
                        <div id='commentsButton'>
                            <ButtonOne
                                text={
                                    portfolio.comments.length > 0
                                        ? 'Comments'
                                        : 'Comment'
                                }
                                onClick={() => setCommentsView(1)}
                            >
                                <CommentIcon />
                            </ButtonOne>
                        </div>
                    </div>
                </aside>
                <MenuBar />
            </ContainerPortfolio>
        </WrapperPortfolio>
    )
}
