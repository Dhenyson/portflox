import { useState } from 'react'

export default function uploadPortfolioImg() {
    const [uploadedFiles, setUploadedFiles] = useState([])

    return { uploadedFiles, setUploadedFiles }
}
