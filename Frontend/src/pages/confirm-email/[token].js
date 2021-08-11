import ConfirmEmail from '../../components/confirmEmail'
import { useRouter } from 'next/router'

export default function ConfirmEmailPage() {
    const router = useRouter()

    return <ConfirmEmail token={router.query.token} />
}
