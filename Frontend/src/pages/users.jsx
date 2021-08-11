import Users from '../components/_users'
import hlp from '../helpers'

export default function JSX(props) {
    return <Users users={props.users} />
}

export const getStaticProps = async () => {
    try {
        const response = await fetch(`${hlp.BACKEND_HOST}/users`)
        const data = await response.json()

        if (data.status && data.status == 'error') {
            return { props: { users: [] }, revalidate: hlp.REVALIDATE_TIME }
        }

        return { props: { users: data.users }, revalidate: hlp.REVALIDATE_TIME }
    } catch (error) {
        return { props: { users: [] }, revalidate: hlp.REVALIDATE_TIME }
    }
}
