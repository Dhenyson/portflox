import { useDropzone } from 'react-dropzone'
import reqEditProfilePicture from '../../../services/reqEditProfilePicture'
import { useContextValues } from '../../../context'
import updateLocalSession from '../../../utils/updateLocalSession'

export default function DropComp() {
    const { showFlashMsg, setLoaderBarVisibility, setSession } =
        useContextValues()

    async function onDrop(file) {
        if (file[0]) {
            setLoaderBarVisibility(1)
            const response = await reqEditProfilePicture(file[0])
            setLoaderBarVisibility(0)

            if (response.status == 'success') {
                if (typeof window !== 'undefined' && localStorage) {
                    updateLocalSession(response)
                    setSession(response)
                    showFlashMsg(response.status, 5, response.msg)
                }
            } else {
                showFlashMsg(response.status, 5, response.msg)
            }
        } else {
            showFlashMsg(
                'error',
                5,
                'Invalid picture! Accepted: jpeg, png, jpg, pjpeg. Max size: 2MB'
            )
        }
    }

    const configObject = {
        accept: ['image/jpeg', 'image/pjpeg', 'image/png', 'image/jpg'],
        maxFiles: 1,
        maxSize: 2000000,
        multiple: false,
        onDrop
    }

    const { getRootProps, getInputProps } = useDropzone(configObject)

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Edit</p>
        </div>
    )
}
