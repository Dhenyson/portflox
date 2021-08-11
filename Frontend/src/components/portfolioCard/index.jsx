import {
    ContainerPortfolio,
    Header,
    AuthorInfos,
    HeartIcon,
    CommentIcon,
    MapIcon
} from './styles'
import ButtonOne from '../buttons/buttonOne'

import dataDiff from '../../utils/handleDates'
import hlp from '../../helpers'
import { useContextValues } from '../../context'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Portfolios({ portfolio, local, action }) {
    const [viewOption, setViewOption] = useState(0)
    const [urlBanner, setUrlBanner] = useState(hlp.DEFAULT_PORTFOLIO_BANNER)
    const [profilePicture, setProfilePicture] = useState(
        hlp.DEFAULT_PROFILE_IMG
    )

    let cDate = new Date(portfolio.creationDate)
    let uDate = new Date(portfolio.updateDate)

    const router = useRouter()
    const { setLoaderBarVisibility } = useContextValues()

    function btnView() {
        setLoaderBarVisibility(1)
        router.push(`/p/${portfolio.slug}`)
    }
    function toggleViewOption() {
        setViewOption(viewOption == 0 ? 1 : 0)
        if (action) {
            action()
        }
    }
    function onErrorBanner() {
        setUrlBanner(hlp.DEFAULT_PORTFOLIO_BANNER)
    }
    function onErrorProfilePicture() {
        setProfilePicture(hlp.DEFAULT_PROFILE_IMG)
    }

    /** Formats and return the time the post was made */
    const { diff } = dataDiff(portfolio.updateDate)

    /** Update imgs if exist imagem in portfolio */
    useEffect(() => {
        if (portfolio.images[0]) {
            setUrlBanner(
                `${hlp.BACKEND_HOST}/images/portfolioImages/${portfolio.images[0]}`
            )
        } else {
            setUrlBanner(hlp.DEFAULT_PORTFOLIO_BANNER)
        }
    }, [portfolio])

    /** Updates profile picture if there is */
    useEffect(() => {
        if (portfolio.author.profilePicture.length > 0) {
            setProfilePicture(`
            ${hlp.BACKEND_HOST}/pictures/${portfolio.author.profilePicture}
        `)
        } else {
            setProfilePicture(hlp.DEFAULT_PROFILE_IMG)
        }
    }, [portfolio])

    return (
        <ContainerPortfolio
            local={local}
            viewOption={viewOption}
            onClick={toggleViewOption}
        >
            <div className='toView'>
                <ButtonOne text='View' onClick={btnView} />
            </div>

            <AuthorInfos local={local} viewOption={viewOption}>
                <div className='authorImg'>
                    <img
                        src={profilePicture}
                        alt={portfolio.author.name}
                        onError={onErrorProfilePicture}
                    />
                </div>

                <p className='authorName'>
                    &nbsp;{portfolio.author.name}&nbsp;
                </p>

                <div className='authorAddress'>
                    <MapIcon />
                    <p>
                        {portfolio.author.city.length <= 0 &&
                            portfolio.author.state.length <= 0 &&
                            portfolio.author.country.length <= 0 && <>--</>}

                        {portfolio.author.city.length >= 1 && (
                            <>{portfolio.author.city}</>
                        )}
                        {portfolio.author.city.length >= 1 &&
                            portfolio.author.state.length >= 1 && <>,&nbsp;</>}

                        {portfolio.author.state}
                        {portfolio.author.state.length >= 1 &&
                            portfolio.author.country.length >= 1 && (
                                <>&nbsp;-&nbsp;</>
                            )}
                        {portfolio.author.country}
                    </p>
                </div>
            </AuthorInfos>

            <div className='bannerContainer'>
                <img src={urlBanner} onError={onErrorBanner} />
            </div>

            <div className='interactions'>
                <div className='interact'>
                    <p>{portfolio.likes.length}</p>
                    <HeartIcon className='likes' />
                </div>

                <span>&nbsp;|&nbsp;</span>

                <div className='interact'>
                    <p>{portfolio.commentsAmount}</p>
                    <CommentIcon className='comment' />
                </div>
            </div>

            <div className='categoryAndTags'>
                <p className={portfolio.category}>{portfolio.category}</p>
                <span>
                    {portfolio.tags.map((item, index) => (
                        <p key={index}>{item}</p>
                    ))}
                </span>
            </div>

            <h1 className='title'>{portfolio.title}</h1>

            <p className='dates'>
                <p>
                    <b>Created:&nbsp;</b>{' '}
                    {dataDiff(portfolio.creationDate).diff} ago
                </p>
                {cDate.getTime() < uDate.getTime() && (
                    <p className='updateDate'>
                        <p className='division'>&nbsp;|&nbsp;</p>{' '}
                        <b>Updated:&nbsp;</b>
                        {dataDiff(portfolio.updateDate).diff} ago
                    </p>
                )}
            </p>

            <div className='description'>
                <p>{portfolio.description}</p>
            </div>
        </ContainerPortfolio>
    )
}
