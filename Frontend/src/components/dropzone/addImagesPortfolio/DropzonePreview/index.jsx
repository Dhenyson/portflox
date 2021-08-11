import { ContainerDropzonePreviewList, ButtonRemoveImg } from './styles'
import { useContextValues } from '../../../../context'

export default function DropzonePreviewList(props) {
    const { uploadedFiles, setUploadedFiles } = useContextValues()

    function removeImg() {
        const newFiles = [...uploadedFiles]
        newFiles.splice(props.index, 1)
        setUploadedFiles(newFiles)
    }

    return (
        <ContainerDropzonePreviewList
            url={props.img.preview}
            id={props.id}
            className={props.className}
        >
            <ButtonRemoveImg className='button' onClick={removeImg}>
                <p>X</p>
            </ButtonRemoveImg>
        </ContainerDropzonePreviewList>
    )
}
