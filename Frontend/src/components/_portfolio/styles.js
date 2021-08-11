import styled, { css } from 'styled-components'
import {
    Stars,
    Map,
    Work,
    Comment,
    Report,
    HeartOutline,
    Heart,
    DeleteForever,
    Edit
} from '../icons'
import { PreviewMD } from '../../styles/markdown'

export const WrapperPortfolio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    @media (max-width: 300px) {
        justify-content: normal;
    }

    ${props => props.commentsVisibility == 1 && 'position: fixed;'}
    .confirmDeleteModal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: 320px;

        padding: 10px;
        border-radius: 10px;

        #buttons {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            width: 80%;
            #btn {
                margin: 10px;
            }
        }
    }
`

export const ContainerPortfolio = styled.div`
    ${PreviewMD}

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;

    padding: 10px;
    max-width: 1180px;

    @media (min-width: 640px) {
        margin-left: 10px;
    }

    > aside {
        position: sticky;
        top: 10px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;

        width: 30%;
        min-height: 420px;
        margin-bottom: 80px;

        @media (max-width: 940px) {
            width: 100%;
            position: relative;
        }

        .author {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            width: 100%;

            padding: 10px;
            padding-bottom: 20px;
            margin-bottom: 10px;
            border-radius: 10px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );

            .profilePicture {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70px;
                height: 70px;
                overflow: hidden;
                border-radius: 50%;
                border: 2px solid ${props => props.theme.colors.textOne};
                > img {
                    width: 70px;
                    min-width: 80px;
                    object-fit: cover;

                    border-radius: 50%;
                    padding: 5px;
                    overflow: hidden;
                    width: 100%;
                }
            }
            > p,
            > div {
                text-align: center;
                margin-top: 5px;
            }
            #stars {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            #buttonProfile {
                margin-top: 20px;
            }
        }

        .likes {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;

            padding: 10px 10px 10px 10px;
            width: 100%;
            border-radius: 10px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
            margin-bottom: 10px;

            @media (max-width: 320px) {
                flex-direction: column-reverse;
            }

            #amountLikes {
                display: flex;
                align-items: center;
                height: 100%;
                @media (max-width: 320px) {
                    margin: 5px;
                }
            }
        }

        .comments {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            overflow: hidden;
            width: 100%;

            padding: 10px;
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );

            #commentItemPreview {
                margin-bottom: 10px;
                width: 100%;
                max-width: 640px;
            }

            #amount {
                margin-top: 10px;
            }
            #commentsButton {
                margin-top: 20px;
            }
        }
    }
    > main {
        width: 100%;

        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: start;

        border-radius: 10px;

        @media (min-width: 941px) {
            margin-right: 20px;
            height: 100vh;
            position: relative;
            overflow: scroll;
        }

        .categoryAndTags {
            display: flex;

            width: 100%;
            height: 50px;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 10px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
            cursor: default;

            > p {
                display: flex;
                align-items: center;

                text-align: center;
                margin-right: 10px;
                padding: 0 5px 0 5px;
                max-width: 120px;
                height: 100%;
                color: #000;
                font-weight: bold;
                border-radius: 10px;
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
                overflow: scroll;
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
                    background: ${props => props.theme.colors.tertiary};
                    background: linear-gradient(
                        180deg,
                        ${props => props.theme.colors.tertiary} 0%,
                        ${props => props.theme.colors.tertiary2} 100%
                    );

                    border-radius: 10px;
                }
            }
        }
        .titleAndDescription {
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
            margin-bottom: 20px;
            border-radius: 10px;
        }
        .title {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100%;
            padding: 10px;

            /* margin-bottom: 5px; */
            border-radius: 10px 10px 0 0;

            .service {
                color: #00ff00;
                ${props => props.theme.type === 'lighter' && 'color: #00a400;'}
            }
            .work {
                color: #08f9f9;
                ${props => props.theme.type === 'lighter' && 'color: #04aeae;'}
            }
            .contribution {
                color: #ce7dff;
            }
            .study {
                color: #ffb74a;
                ${props => props.theme.type === 'lighter' && 'color: #ff9f0f;'}
            }
            .annotation {
                color: #f9672c;
            }
            .blog {
                color: #ccc;
                ${props => props.theme.type === 'lighter' && 'color: #000;'}
            }

            > h1 {
                text-align: center;
                font-size: 20px;
            }
        }
        .description {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;

            width: 100%;
            padding: 10px;
            border-radius: 0 0 10px 10px;
            #description {
                font-size: 14px;
                opacity: 0.6;
            }
            #dates {
                display: flex;
                margin-top: 10px;
                font-size: 12px;
            }
        }
        .images {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 100%;
            padding: 10px;

            margin-bottom: 20px;
            border-radius: 10px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
            #imagesSmall {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                #imagesItems {
                    display: flex;
                    align-items: center;

                    width: 100px;
                    height: 100px;
                    margin: 5px;
                    overflow: hidden;

                    border-radius: 10px;
                    cursor: pointer;
                    transition-duration: 0.3s;
                    background-color: ${props => props.theme.colors.tertiary};
                    :hover {
                        padding: 0px;
                    }

                    > img {
                        width: 100%;
                        height: auto;
                        max-height: 100%;
                        /* border-radius: 10px; */
                    }
                }
            }
        }
        .contentBody {
            width: 100%;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
            border-radius: 10px;
            padding: 10px;
            margin-bottom: 80px;

            @media (max-width: 940px) {
                margin-bottom: 20px;
            }

            > div > div {
                > p,
                > h1,
                > h2,
                > h3,
                > h4,
                > h5,
                > h6,
                > ul,
                > ol,
                > li {
                    color: ${props => props.theme.colors.textOne};
                }

                > p > code {
                    color: #ccc;
                }
            }
        }
    }
`
const IconStyle = css`
    width: 15px;
    height: 15px;
    fill: ${props => props.theme.colors.textOne};
`

export const StarsIcon = styled(Stars)`
    ${IconStyle}
    fill: #ff0 !important;
`
export const MapIcon = styled(Map)`
    ${IconStyle}
`
export const CommentIcon = styled(Comment)`
    ${IconStyle}
    margin-right: 5px;
`
export const WorkIcon = styled(Work)`
    ${IconStyle}
`
export const ReportIcon = styled(Report)`
    ${IconStyle}
    fill: #f50;
`
export const HeartIcon = styled(Heart)`
    ${IconStyle}
    fill: #f00;
`
export const HeartOutlineIcon = styled(HeartOutline)`
    ${IconStyle}
    fill: #f00;
`
export const DeleteForeverIcon = styled(DeleteForever)`
    ${IconStyle}
`
export const EditIcon = styled(Edit)`
    ${IconStyle}
`
