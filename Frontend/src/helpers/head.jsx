import hlp from '../helpers'

export default function Head({ type, url, title, description, image }) {
    return (
        <head>
            {/* <!-- Primary Meta Tags --> */}
            <title>{title ? `Portflox: ${title}` : hlp.APP_NAME}</title>
            <meta name='title' content={title ? title : hlp.APP_NAME} />
            <meta
                name='description'
                content={description ? description : hlp.APP_DESCRIPTION}
            />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property='og:type' content={type ? type : 'website'} />
            <meta
                property='og:url'
                content={url ? url : 'https://portflox.com'}
            />
            <meta property='og:title' content={title ? title : hlp.APP_NAME} />
            <meta
                property='og:description'
                content={description ? description : hlp.APP_DESCRIPTION}
            />
            <meta
                property='og:image'
                content={
                    image ? image : 'https://www.portflox.com/images/banner.jpg'
                }
            />

            {/* <!-- Twitter --> */}
            <meta property='twitter:card' content='summary_large_image' />
            <meta
                property='twitter:url'
                content={url ? url : 'https://portflox.com'}
            />
            <meta
                property='twitter:title'
                content={title ? title : hlp.APP_NAME}
            />
            <meta property='twitter:description' content='dttrtrtr' />
            <meta
                property='twitter:image'
                content={
                    image ? image : 'https://www.portflox.com/images/banner.jpg'
                }
            />
        </head>
    )
}
