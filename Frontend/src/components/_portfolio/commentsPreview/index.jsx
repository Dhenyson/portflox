import {
    ContainerCommentsPreview,
    ReportIcon,
    DeleteForeverIcon,
    EditIcon
} from './styles'
import Modal from '../../modal'
import ButtonOne from '../../buttons/buttonOne'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import hlp from '../../../helpers'
import dataDiff from '../../../utils/handleDates'
import { useContextValues } from '../../../context'
import reqCommentDel from '../../../services/reqCommentDel'
import reqCommentEdit from '../../../services/reqCommentEdit'
import Support from '../../support'

export default function CommentsPreview({ comment, type }) {
    const [authorPicture, setAuthorPicture] = useState(hlp.DEFAULT_PROFILE_IMG)
    const [textInputEdit, setTextInputEdit] = useState(comment.content)
    const [isAuthorViewer, setIsAuthorViewer] = useState(0)
    const [infoExtraSupport, setInfoExtraSupport] = useState({})
    const [supportVisibility, setSupportVisibility] = useState(0)
    const [textAreaHeight, setTextAreaHeight] = useState(0)
    const [modalEditedVisibility, setModalEditedVisibility] = useState(0)
    const [modalDeleteCommentVisibility, setModalDeleteCommentVisibility] =
        useState(0)
    const [modalEditCommentVisibility, setModalEditCommentVisibility] =
        useState(0)

    const {
        session,
        showFlashMsg,
        setLoaderBarVisibility,
        setDeleteCommentID
    } = useContextValues()

    const textAreaRef = useRef()

    /** Formats and return the time the post was made */
    const { diff } = dataDiff(comment.creationDate)
    const resDiff = dataDiff(comment.editDate)
    const editDate = resDiff.diff

    const router = useRouter()

    function goToUserProfile() {
        if (type != 'preview') {
            setLoaderBarVisibility(1)
            router.push(`/me/${comment.author.slug}`)
        }
    }

    function onErrorAuthorPicture() {
        setAuthorPicture(hlp.DEFAULT_PROFILE_IMG)
    }

    async function deleteButtonAction() {
        try {
            setLoaderBarVisibility(1)
            const token = session.accessToken
            const commentID = comment._id
            const response = await reqCommentDel(token, commentID)
            setLoaderBarVisibility(0)

            if (response.status == 'success') {
                showFlashMsg('success', 5, 'Comment deleted')
                setDeleteCommentID(comment._id)
                setModalDeleteCommentVisibility(0)
            }

            if (response.status == 'error') {
                showFlashMsg('error', 5, response.msg)
            }
        } catch (error) {
            showFlashMsg('error', 5, 'Internal error')
        }
    }

    async function btnSaveEditComment() {
        try {
            setLoaderBarVisibility(1)
            const token = session.accessToken
            const commentID = comment._id
            const content = textInputEdit
            const response = await reqCommentEdit(token, commentID, content)
            setLoaderBarVisibility(0)

            if (response.status == 'success') {
                showFlashMsg('success', 5, 'Comment edited')
                comment.oldContents.push({
                    oldContent: comment.content,
                    date: Date.now()
                })
                comment.content = textInputEdit
                comment.editDate = Date.now()

                setModalEditCommentVisibility(0)
            }

            if (response.status == 'error') {
                showFlashMsg('error', 5, response.msg)
            }
        } catch (error) {
            showFlashMsg('error', 5, 'Internal error')
        }
    }

    /** Update profile picture if there is */
    useEffect(() => {
        if (comment.author.profilePicture.length > 1) {
            setAuthorPicture(
                `${hlp.BACKEND_HOST}/pictures/${comment.author.profilePicture}`
            )
        }
    }, [])

    /** Update the profile picture of the logged in user, if he changes his picture */
    useEffect(() => {
        if (comment.author._id.toString() == session.user.id.toString()) {
            setAuthorPicture(
                `${hlp.BACKEND_HOST}/pictures/${session.user.profilePicture}`
            )
        }
    }, [session])

    /** Define if the viewer is the author of the comment */
    useEffect(() => {
        if (session.user.id.length > 1) {
            if (session.user.id == comment.author._id) {
                setIsAuthorViewer(1)
            }
        }
    })

    /** Define extra info for support */
    useEffect(() => {
        if (window && window.location) {
            let url = window.location.href
            let commentID = comment._id
            let commentContent = comment.content
            setInfoExtraSupport({ url, commentID, commentContent })
        }
    }, [])

    /** Resize textarea */
    useEffect(() => {
        setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`)
    })

    return (
        <ContainerCommentsPreview type={type}>
            <Modal
                visibility={modalDeleteCommentVisibility}
                bgClick={() => setModalDeleteCommentVisibility(0)}
            >
                <div className='confirmDeleteModal'>
                    <p>Portfolio delete confirmation</p>
                    <div id='buttons'>
                        <ButtonOne
                            id='btn'
                            text='Cancel'
                            onClick={() => setModalDeleteCommentVisibility(0)}
                        />
                        <ButtonOne
                            id='btn'
                            text='Confirm'
                            onClick={deleteButtonAction}
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                visibility={modalEditCommentVisibility}
                bgClick={() => setModalEditCommentVisibility(0)}
            >
                <div className='modalEditComment'>
                    <textarea
                        ref={textAreaRef}
                        value={textInputEdit}
                        onChange={e => setTextInputEdit(e.target.value)}
                        style={{
                            height: `${textAreaHeight}`,
                            minHeight: '40px',
                            maxHeight: '250px'
                        }}
                    />
                    <div id='buttons'>
                        <ButtonOne
                            id='btn'
                            text='Cancel'
                            onClick={() => setModalEditCommentVisibility(0)}
                        />
                        <ButtonOne
                            id='btn'
                            text='Save'
                            onClick={btnSaveEditComment}
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                visibility={modalEditedVisibility}
                bgClick={() => setModalEditedVisibility(0)}
            >
                <div id='modalOldcomment'>
                    <p>Old comment</p>
                    <div id='oldCommentArea'>
                        {comment.oldContents.length >= 1 &&
                            comment.oldContents.map((item, index) => {
                                const resDiffOld = dataDiff(item.date)
                                const dateOld = resDiffOld.diff
                                return (
                                    <div className='oldCommentItem' key={index}>
                                        <p className='oldComment'>
                                            {item.oldContent}
                                        </p>
                                        <p className='oldDate'>{dateOld}</p>
                                    </div>
                                )
                            })}
                    </div>

                    <ButtonOne
                        text='Close'
                        onClick={() => setModalEditedVisibility(0)}
                        id='btnOldCommentModal'
                    />
                </div>
            </Modal>

            <Support
                type={'report comment'}
                extra={infoExtraSupport}
                visibility={supportVisibility}
                close={() => setSupportVisibility(0)}
            />

            <div id='commentItem'>
                <div id='commentImg' onClick={goToUserProfile}>
                    <img src={authorPicture} onError={onErrorAuthorPicture} />
                </div>
                <div>
                    <div id='detailsBalloon' />
                </div>
                <div id='balloon'>
                    <div className='header'>
                        <p id='commentItemName' onClick={goToUserProfile}>
                            {comment.author.name}
                        </p>
                        {comment.oldContents.length >= 1 && (
                            <div
                                id='editedInfo'
                                onClick={() => setModalEditedVisibility(1)}
                            >
                                <button>
                                    <p>Edited - {editDate}</p>
                                </button>
                            </div>
                        )}
                        <div id='btnActions'>
                            {isAuthorViewer == 0 ? (
                                <ReportIcon
                                    id='icon'
                                    onClick={() => setSupportVisibility(1)}
                                />
                            ) : (
                                <>
                                    <EditIcon
                                        id='icon'
                                        onClick={() =>
                                            setModalEditCommentVisibility(1)
                                        }
                                    />
                                    <DeleteForeverIcon
                                        id='icon'
                                        onClick={() =>
                                            setModalDeleteCommentVisibility(1)
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <p id='commentMsg'>{comment.content}</p>
                    <p id='time'>{dataDiff(comment.creationDate).diff}</p>
                </div>
            </div>
        </ContainerCommentsPreview>
    )
}
