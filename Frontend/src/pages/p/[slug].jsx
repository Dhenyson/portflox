import Portfolio from '../../components/_portfolio'
import hlp from '../../helpers'
import { useRouter } from 'next/router'
import Loader from '../../components/loader'

export default function PortfolioPage(props) {
    const { isFallback } = useRouter()
    if (isFallback) {
        return <Loader visibility={true} />
    }
    return <Portfolio portfolio={props.portfolio} comments={props.comments} />
}

export async function getStaticPaths() {
    try {
        const response = await fetch(`${hlp.BACKEND_HOST}/portfolios`)
        const data = await response.json()

        const paths = data.portfolios.map(portfolio => {
            return { params: { slug: portfolio.slug } }
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
        fetch(`${hlp.BACKEND_HOST}/portfolios/${slug}`),
        fetch(`${hlp.BACKEND_HOST}/comments/get/${slug}`)
    ])
    const dataPortfolio = await response1.json()
    const dataComments = await response2.json()

    if (dataPortfolio.status == 'success' && dataComments.status == 'success') {
        return {
            props: {
                portfolio: dataPortfolio.portfolio,
                comments: dataComments.comments
            },
            revalidate: hlp.REVALIDATE_TIME
        }
    }
}
