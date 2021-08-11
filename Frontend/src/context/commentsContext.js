import { useState } from 'react'

export default function commensContext() {
    const [deleteCommentID, setDeleteCommentID] = useState('')

    return { deleteCommentID, setDeleteCommentID }
}
