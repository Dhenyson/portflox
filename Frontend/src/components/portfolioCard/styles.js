import styled, { css } from 'styled-components'
import { Heart, Comment, Map } from '../icons'

const flexDefault = css`
    display: flex;
    align-items: center;
    justify-content: center;
`
const backgroundDefault = css`
    background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    );
`
const textOneLine = css`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
`
export const ContainerPortfolio = styled.div`
    width: 100%;
    max-width: 600px;
    height: 320px;
    overflow: hidden;

    position: relative;

    ${flexDefault}
    flex-direction: column;
    justify-content: flex-start;

    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 20px;
    margin: 10px;

    transition-duration: 0.3s;
    @media (min-width: 640px) {
        margin: 20px;
    }

    ${backgroundDefault}
    cursor: pointer;
    :hover {
        filter: brightness(120%);
    }

    .toView {
        width: 100%;
        min-height: 100%;

        ${flexDefault}
        ${backgroundDefault}

        position: absolute;
        z-index: 1;

        ${props => props.viewOption == 0 && 'display: none;'}
    }

    .bannerContainer {
        width: 100%;
        height: 50%;
        overflow: hidden;

        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px 20px 0px 0px;

        > img {
            width: 100%;
            height: auto;
            min-height: 100%;
            opacity: 0.15;
        }
    }

    .description {
        max-width: 100%;

        ${flexDefault}
        justify-content: start;
        margin-top: 5px;

        @media (max-width: 320px) {
            display: none;
        }

        > p {
            max-width: calc(100% - 140px);
            ${props => props.local === 'user' && 'max-width: 100%;'}
            ${flexDefault}
            justify-content: start;

            padding-left: 10px;

            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    .interactions {
        ${flexDefault}

        position: absolute;
        top: 41%;

        @media (min-width: 320px) {
            flex-direction: column;
            top: 10px;
            right: 10px;
            > span {
                display: none;
            }
        }

        .interact {
            ${flexDefault}
        }
    }

    .categoryAndTags {
        width: 100%;
        overflow: scroll;

        ${flexDefault}
        justify-content: start;

        margin-top: 5px;
        margin-left: 10px;
        font-size: 12px;

        @media (min-width: 320px) {
            max-width: calc(100% - 100px);
            position: absolute;
            top: 0;
            left: 0;
            margin-top: 10px;
            font-size: 14px;
        }

        > p {
            max-width: 120px;
            height: 100%;

            ${flexDefault}

            margin-right: 10px;
            padding: 0 5px 3px 5px;
            border-radius: 10px;
            color: #000;

            text-align: center;
            font-weight: bold;
        }

        .service {
            background: rgb(0, 255, 0);
            background: linear-gradient(
                177deg,
                rgba(0, 255, 0, 1) 0%,
                rgba(1, 79, 1, 1) 100%
            );
        }
        .work {
            background: rgb(0, 227, 217);
            background: linear-gradient(
                177deg,
                rgba(0, 227, 217, 1) 0%,
                rgba(1, 84, 88, 1) 100%
            );
        }
        .contribution {
            background: rgb(206, 125, 255);
            background: linear-gradient(
                180deg,
                rgba(206, 125, 255, 1) 0%,
                rgba(88, 55, 107, 1) 100%
            );
        }
        .study {
            background: rgb(255, 216, 125);
            background: linear-gradient(
                180deg,
                rgba(255, 216, 125, 1) 0%,
                rgba(134, 114, 67, 1) 100%
            );
        }
        .annotation {
            background: rgb(249, 103, 44);
            background: linear-gradient(
                180deg,
                rgba(249, 103, 44, 1) 0%,
                rgba(120, 50, 21, 1) 100%
            );
        }
        .blog {
            background: rgb(204, 204, 204);
            background: linear-gradient(
                180deg,
                rgba(204, 204, 204, 1) 0%,
                rgba(91, 90, 90, 1) 100%
            );
        }

        > span {
            display: flex;

            > p {
                display: flex;
                align-items: center;
                justify-content: center;

                white-space: nowrap;

                opacity: 0.7;
                text-align: center;
                margin-right: 10px;
                padding: 0 5px 0 5px;

                /* height: 100%; */
                background: linear-gradient(
                    180deg,
                    ${props => props.theme.colors.tertiary} 0%,
                    ${props => props.theme.colors.tertiary2} 100%
                );

                border-radius: 10px;
            }
        }
    }

    .title {
        height: 27%;
        margin-top: 10px;

        ${flexDefault}

        text-align: center;
        font-size: 20px;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;

        @media (min-width: 320px) {
            max-width: calc(100% - 105px);
            ${props => props.local === 'user' && 'max-width: 100%;'}
            height: 33%;

            position: absolute;
            top: 30px;
            left: 10px;

            text-align: left;
            font-size: 29px;
        }
    }

    .dates {
        width: 100%;

        ${flexDefault}
        flex-direction: column;

        position: absolute;
        bottom: 5px;

        margin: 5px 10px 0 10px;
        padding: 0px 10px 0 10px;
        opacity: 0.4;

        text-align: center;
        font-size: 10px;

        .division {
            display: none;
        }

        .updateDate {
            ${flexDefault}
        }

        @media (min-width: 420px) {
            flex-direction: row;
            justify-content: start;

            /* position: relative; */

            font-size: 14px;
            .division {
                display: block;
            }
        }
    }
`

export const AuthorInfos = styled.div`
    width: 100%;
    overflow: hidden;

    ${flexDefault}
    flex-direction: column;

    position: absolute;
    top: 5px;
    z-index: 1;

    margin-top: 10px;

    @media (min-width: 320px) {
        max-width: 100px;
        top: 38%;
        right: 10px;
        margin-top: 0px;
    }

    .authorImg {
        width: 80px;
        height: 80px;
        @media (max-width: 320px) {
            width: 60px;
            height: 60px;
        }
        overflow: hidden;

        ${flexDefault}
        border-radius: 50%;
        margin-bottom: 10px;

        background-color: #fff;

        > img {
            max-width: 90px;
            min-width: 90px;
            height: 90px;
            @media (max-width: 320px) {
                max-width: 70px;
                min-width: 70px;
                height: 70px;
            }

            object-fit: cover;
            /* border: 3px solid
                    ${props => props.theme.colors.backgroundInverted}; */
            border-radius: 50%;
            padding: 5px;
            overflow: hidden;
            width: 100%;
        }
    }

    .authorName {
        ${textOneLine}
        margin-bottom: 2px;
    }

    .authorAddress {
        width: 100%;

        ${flexDefault}

        text-align: center;
        font-size: 13px;

        > p {
            ${textOneLine}
        }
    }

    ${props => props.viewOption === 1 && 'display: none;'}
    ${props => props.local === 'user' && 'display: none;'}
`

export const Header = styled.div`
    background-color: #f00;
    width: 100%;
    height: 50%;
    overflow: hidden;

    ${flexDefault}

    /* margin-top: 50%; */

    .categoryAndTags {
        width: 100%;
    }
`

export const HeartIcon = styled(Heart)`
    width: 17px;
    height: 17px;
    margin-top: 2px;
    margin-left: 1px;
`
export const CommentIcon = styled(Comment)`
    width: 17px;
    height: 17px;
    margin-top: 2px;
    margin-left: 1px;
`
export const MapIcon = styled(Map)`
    width: 12px;
    min-width: 12px;
    height: 12px;
    min-height: 12px;

    margin-right: 3px;
    margin-bottom: -1px;
`
