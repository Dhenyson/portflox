import { WrapperComments, ContainerComments } from './styles'
import CommentsPreview from '../commentsPreview'
import CloseButton from '../../buttons/closeButtonIcon'
import FlashMessage from '../../flashMessage'

import reqCommentPost from '../../../services/reqCommentPost'
import { useContextValues } from '../../../context'
import { useState, useEffect, useRef } from 'react'

export default function Comments(props) {
    const [commentsList, setCommentsList] = useState(props.comments)
    const [input, setInput] = useState('')
    const [textAreaHeight, setTextAreaHeight] = useState('40px')

    const content = useRef()
    const textArea = useRef()

    const {
        session,
        showFlashMsg,
        setLoaderBarVisibility,
        authenticated,
        deleteCommentID
    } = useContextValues()

    async function sendButtonAction() {
        try {
            if (!authenticated) {
                return showFlashMsg('error', 5, 'Login is required')
            }
            if (input.length < 2) {
                return showFlashMsg('error', 5, 'very short comment')
            }
            setLoaderBarVisibility(1)
            const token = session.accessToken
            const portfolioID = props.portfolioID
            const content = input
            const response = await reqCommentPost(token, portfolioID, content)
            setLoaderBarVisibility(0)

            if (response.status == 'success') {
                showFlashMsg('success', 3, 'Comment added')
                const newComment = {
                    _id: response.comment._id,
                    content: input,
                    author: {
                        _id: session.user.id,
                        slug: session.user.slug,
                        name: session.user.name,
                        profilePicture: session.user.profilePicture
                    },
                    creationDate: Date.now(),
                    likes: [],
                    dislikes: [],
                    oldContents: [],
                    editDate: Date.now()
                }
                const copyCommentList = [...commentsList]
                props.comments.push(newComment)
                copyCommentList.push(newComment)
                setCommentsList(copyCommentList)
                setInput('')
            }

            if (response.status == 'error') {
                showFlashMsg(response.status, 5, response.msg)
            }
        } catch (error) {
            showFlashMsg('error', 5, 'Internal error')
        }
    }

    /** Faz com que o scroll fique sempre no final */
    useEffect(() => {
        if (content.current.scrollHeight > content.current.offsetHeight) {
            content.current.scrollTop =
                content.current.scrollHeight - content.current.offsetHeight
        }
    })

    useEffect(() => {
        setTextAreaHeight(`${textArea.current.scrollHeight}px`)
    })

    useEffect(() => {
        commentsList.map((comment, index) => {
            if (comment._id.toString() == deleteCommentID.toString()) {
                commentsList.splice(index, 1)
            }
        })
    }, [deleteCommentID])

    return (
        <WrapperComments visibility={props.visibility}>
            <ContainerComments>
                <FlashMessage />
                <div className='comments' ref={content}>
                    {commentsList.map((item, index) => (
                        <div id='commentItemPreview' key={index}>
                            <CommentsPreview comment={item} lineLimit={0} />
                        </div>
                    ))}
                </div>
                <div id='toComment'>
                    <textarea
                        ref={textArea}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type here...'
                        style={{
                            height: `${textAreaHeight}`,
                            minHeight: '40px',
                            maxHeight: '250px'
                        }}
                    />
                    <button id='btnSend' onClick={sendButtonAction}>
                        Send
                    </button>
                </div>
                <div id='closeButton' onClick={props.close}>
                    <CloseButton onClick={props.close} />
                </div>
            </ContainerComments>

            <div className='background' onClick={props.close} />
        </WrapperComments>
    )
}
