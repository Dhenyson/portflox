import { WrapperDropzone, ImageIcon } from './styles'
import { useDropzone } from 'react-dropzone'
import { useContextValues } from '../../../context'

export default function Dropzone(props) {
    const { uploadedFiles, setUploadedFiles } = useContextValues()

    function onDrop(files) {
        if (uploadedFiles.length < 5) {
            const uploadedFilesObj = files.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }))

            setUploadedFiles(uploadedFiles.concat(uploadedFilesObj))
        }
    }

    const configObject = {
        accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/jpg'],
        maxFiles: 5,
        maxSize: 2000000,
        onDrop
    }

    const { getRootProps, getInputProps } = useDropzone(configObject)

    return (
        <WrapperDropzone
            {...getRootProps()}
            id={props.id}
            className={props.className}
        >
            <ImageIcon />
            <div>
                <input {...getInputProps()} />
                <p id='text'>Drop here or click</p>
            </div>
        </WrapperDropzone>
    )
}
