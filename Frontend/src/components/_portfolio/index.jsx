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
import Loader from '../loader'
import Head from '../../helpers/head'

import hlp from '../../helpers'
import reqPortfolioDelete from '../../services/reqPortfolioDelete'
import reqPortfolioLike from '../../services/reqPortfolioLike'
import handleDates from '../../utils/handleDates'

import { useContextValues } from '../../context'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Layout({ portfolio, comments }) {
    const [imgSelected, setImgSelected] = useState('')
    const [imgSelectedView, setImgSelectedView] = useState(0)
    const [likes, setLikes] = useState(portfolio.likes.length)
    const [isAuthor, setIsAuthor] = useState(0)
    const [alreadyLiked, setAlreadyLiked] = useState(0)
    const [commentsView, setCommentsView] = useState(0)
    const [modalVisibility, setModalVisibility] = useState(0)
    const [supportVisibility, setSupportVisibility] = useState(0)
    const [reportData, setReportData] = useState({})
    const [profilePicture, setProfilePicture] = useState(
        hlp.DEFAULT_PROFILE_IMG
    )

    let cDate = new Date(portfolio.creationDate)
    let uDate = new Date(portfolio.updateDate)

    const router = useRouter()

    const {
        showFlashMsg,
        setLoaderBarVisibility,
        session,
        authenticated,
        setUploadedFiles
    } = useContextValues()

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
    function btnEdit() {
        setLoaderBarVisibility(1)
        setUploadedFiles([])
        router.push({
            pathname: '/portfolio/edit',
            query: {
                category: portfolio.category,
                title: portfolio.title,
                tags: portfolio.tags,
                description: portfolio.description,
                images: portfolio.images,
                body: portfolio.body,
                portfolioID: portfolio._id
            },
            params: {
                teste: 'testando'
            },
            body: {
                teste: 'body'
            }
        })
    }
    async function deleteButtonAction() {
        setLoaderBarVisibility(1)
        const token = session.accessToken
        const portfolioID = portfolio._id
        const response = await reqPortfolioDelete(token, portfolioID)
        setLoaderBarVisibility(0)

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
        let action = ''
        let amount = likes
        if (alreadyLiked == 0) {
            setAlreadyLiked(1)
            setLikes(amount + 1)
            action = '+1'
        } else {
            setAlreadyLiked(0)
            setLikes(amount - 1)
            action = '-1'
        }

        setLoaderBarVisibility(1)
        const token = session.accessToken
        const portfolioID = portfolio._id
        const response = await reqPortfolioLike(token, portfolioID)
        setLoaderBarVisibility(0)

        if (response.status == 'error') {
            showFlashMsg(response.status, 5, response.msg)
            if (action == '-1') {
                setAlreadyLiked(1)
                setLikes(amount)
            } else {
                setAlreadyLiked(0)
                setLikes(amount)
            }
        }
    }

    /** useEffect para atualizar imagem de perfil caso exista */
    useEffect(() => {
        setLoaderBarVisibility(0)
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

    /** Verificar se o visualizador é o author do portfolio */
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
    }, [session])

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
    }, [session])

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
            <title>{portfolio.title}</title>
            <Head
                url={
                    typeof window !== 'undefined'
                        ? window.location.href
                        : hlp.FRONTEND_HOST
                }
                title={portfolio.title}
                description={portfolio.description}
                image={
                    portfolio.images[0]
                        ? `${hlp.BACKEND_HOST}/images/portfolioImages/${portfolio.images[0]}`
                        : 'https://www.portflox.com/images/banner.jpg'
                }
            />
            <Loader />
            <MenuBar />

            <Comments
                visibility={commentsView}
                close={closeCommentsView}
                comments={comments}
                portfolioID={portfolio._id}
            />
            <Support
                type='report portfolio'
                extra={reportData}
                visibility={supportVisibility}
                close={() => setSupportVisibility(0)}
            />
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

                    <div className='titleAndDescription'>
                        <div className='title'>
                            <h1 className={portfolio.category}>
                                {portfolio.title}
                            </h1>
                        </div>

                        <div className='description'>
                            <p id='description'>"{portfolio.description}"</p>

                            <p id='dates'>
                                <b>Created:&nbsp;</b>{' '}
                                {handleDates(portfolio.creationDate).diff} ago
                                {cDate.getTime() < uDate.getTime() && (
                                    <>
                                        &nbsp; <b>|&nbsp;Updated:&nbsp;</b>
                                        {
                                            handleDates(portfolio.updateDate)
                                                .diff
                                        }{' '}
                                        ago
                                    </>
                                )}
                            </p>
                        </div>
                    </div>

                    {portfolio.images.length > 0 && (
                        <div className='images'>
                            <div id='imagesSmall'>
                                {portfolio.images
                                    .slice(0, 5)
                                    .map((img, index) => (
                                        <div
                                            id='imagesItems'
                                            key={index}
                                            onClick={() => viewImage(img)}
                                        >
                                            <img
                                                src={`${hlp.BACKEND_HOST}/images/portfolioImages/${img}`}
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

                    <div className='contentBody'>
                        <MDtextViewer value={portfolio.body} />
                    </div>
                </main>

                <aside>
                    <div className='author'>
                        <div className='profilePicture'>
                            <img
                                src={profilePicture}
                                onError={onErrorProfilePicture}
                            />
                        </div>

                        <p id='name'>{portfolio.author.name}</p>

                        <div id='address'>
                            <MapIcon /> {portfolio.author.city},{' '}
                            {portfolio.author.state}-{portfolio.author.country}
                        </div>

                        <div id='stars'>
                            <WorkIcon />
                            &nbsp; {portfolio.author.portfoliosAmount}
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
                            <ButtonOne text='Edit' onClick={btnEdit}>
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
                        {comments.length <= 0 && (
                            <h1>
                                0 <CommentIcon />
                            </h1>
                        )}

                        {comments.slice(0, 3).map((item, index) => (
                            <div id='commentItemPreview' key={index}>
                                <CommentsPreview
                                    comment={item}
                                    type='preview'
                                />
                            </div>
                        ))}

                        {comments.length > 3 && (
                            <p id='amount'>
                                +{comments.length - 3}&nbsp;
                                <CommentIcon />
                            </p>
                        )}
                        <div id='commentsButton'>
                            <ButtonOne
                                text={
                                    comments.length > 0 ? 'Comments' : 'Comment'
                                }
                                onClick={() => setCommentsView(1)}
                            >
                                <CommentIcon />
                            </ButtonOne>
                        </div>
                    </div>
                </aside>
            </ContainerPortfolio>
        </WrapperPortfolio>
    )
}
