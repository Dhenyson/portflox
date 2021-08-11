import hlp from '../../helpers'
import { useRouter } from 'next/router'
import ContainerUserProfile from '../../components/_userProfile'
import Loader from '../../components/loader'

export default function Profile(props) {
    const { isFallback } = useRouter()

    if (isFallback) {
        return <Loader visibility={true} />
    }
    return (
        <ContainerUserProfile
            user={props.user}
            portfolios={props.portfolios.reverse()}
        />
    )
}

export async function getStaticPaths() {
    try {
        const response = await fetch(`${hlp.BACKEND_HOST}/users`)
        const data = await response.json()

        const paths = data.users.map(user => {
            return { params: { slug: user.slug } }
        })
        return {
            paths,
            fallback: true
        }
    } catch (error) {
        console.log(error)
        return {
            paths: [{ params: { slug: 'default' } }],
            fallback: true
        }
    }
}

export async function getStaticProps(context) {
    const { slug } = context.params

    const [response1, response2] = await Promise.all([
        fetch(`${hlp.BACKEND_HOST}/users/${slug}`),
        fetch(`${hlp.BACKEND_HOST}/portfolios/user/${slug}`)
    ])
    const data1 = await response1.json()
    const data2 = await response2.json()

    if (data1.status == 'success' && data2.status == 'success') {
        return {
            props: { user: data1.user, portfolios: data2.portfolios },
            revalidate: hlp.REVALIDATE_TIME
        }
    }
}
