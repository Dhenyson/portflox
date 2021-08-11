import MDEditor from '@uiw/react-md-editor'
import MarkdownPreview from '@uiw/react-markdown-preview'
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css'

import { useState } from 'react'

function HomePage() {
    const [source, setSource] = useState('')

    return (
        <div style={{ padding: '30px' }}>
            <MDEditor value={source} onChange={setSource} />
            <MDEditor.Markdown source={source} style={{ marginTop: '50px' }} />
        </div>
    )
}

export default HomePage
