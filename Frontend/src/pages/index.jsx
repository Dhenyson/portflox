import hlp from '../helpers'
import MainArea from '../components/_main'

export default function Home(props) {
    return <MainArea portfolios={props.portfolios} />
}

export const getStaticProps = async () => {
    try {
        const response = await fetch(`${hlp.BACKEND_HOST}/portfolios`)
        const data = await response.json()

        return {
            props: { portfolios: data.portfolios.reverse() },
            revalidate: hlp.REVALIDATE_TIME
        }
    } catch (error) {
        return { props: { portfolios: [] }, revalidate: hlp.REVALIDATE_TIME }
    }
}
