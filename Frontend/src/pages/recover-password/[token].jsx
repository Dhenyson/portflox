import RecoverPassword from '../../components/recoverPassword'
import { useRouter } from 'next/router'

export default function Profile(props) {
    const router = useRouter()

    return <RecoverPassword token={router.query.token} />
}
