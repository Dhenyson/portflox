import { WrapperMDEditor } from './styles'

import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/dist/markdown-editor.css'
import '@uiw/react-markdown-preview/dist/markdown.css'

export function MDtextEditor(props) {
    return (
        <WrapperMDEditor>
            <MDEditor
                value={props.value}
                onKeyPress={props.onKeyPress}
                onChange={props.onChange}
                className={props.className}
            />
        </WrapperMDEditor>
    )
}

export function MDtextViewer(props) {
    return (
        <WrapperMDEditor>
            <MDEditor.Markdown source={props.value} />
        </WrapperMDEditor>
    )
}
