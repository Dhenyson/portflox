import styled, { css } from 'styled-components'
import {
    Map,
    LinkedinWithCircle,
    YoutubeWithCircle,
    Github,
    InstagramWithCircle,
    TwitterWithCircle,
    ExpandLess,
    ExpandMore,
    Search,
    ListSettings,
    UserFriends,
    Star,
    StarBorder,
    Stars,
    StarAdd,
    ArrowDownUp,
    Edit
} from '../icons'
import EmptyFeedIcon from '../icons/programmerPortfolio'

export const WrapperUserProfile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 300px) {
        justify-content: normal;
    }
`

const sideItemsStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 20px;
    overflow: hidden;
    margin-bottom: 10px;

    background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    );
    border-radius: 10px;
`

export const ContainerUserProfile = styled.div`
    width: 100%;
    max-width: 1180px;

    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    padding: 10px;
    @media (max-width: 340px) {
        padding: 0px;
    }

    ${props => props.noScroll == 1 && 'position: fixed;'}

    .modal-starred {
        height: 100%;
        width: 100%;
    }

    > aside {
        position: sticky;
        top: 10px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;

        box-sizing: border-box;
        width: 30%;
        min-width: 300px;
        min-height: 420px;
        margin: 10px;

        @media (max-width: 940px) {
            width: 100%;
            position: relative;
        }

        #perfil {
            ${sideItemsStyle}
            position: relative;

            .editPerfil {
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 5px;
            }

            .containerProfileImg {
                width: 100px;
                height: 100px;
                overflow: hidden;

                position: relative;

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 60px;
                border-radius: 50%;
                border: 3px solid
                    ${props => props.theme.colors.backgroundInverted};
            }

            .containerProfileImg:hover > .edit-picture {
                top: 50%;
            }
            .picture {
                max-width: 120px;
                min-width: 120px;
                height: 120px;

                object-fit: cover;
                border-radius: 50%;
                padding: 5px;
                overflow: hidden;
                width: 100%;
            }
            .edit-picture {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 100%;

                opacity: 0.7;
                text-align: center;
                transition-duration: 0.5s;
                cursor: pointer;
                font-size: 16px;
                > div > p {
                    width: 100%;
                    height: 80px;
                    padding-top: 5px;
                    background-color: ${props => props.theme.colors.background};
                }
            }

            > h1 {
                width: 100%;
                margin-top: 20px;
                text-align: center;
                font-weight: bold;

                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            > section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: center;

                #expandable {
                    margin-top: 20px;
                    overflow: hidden;
                    padding: 10px;
                }

                .expanded {
                    text-align: justify;
                    background-color: ${props => props.theme.colors.background};
                    border: ${props => props.theme.colors.secondary} solid 1px;
                    border-radius: 10px;
                }

                .unexpanded {
                    text-align: center;
                    height: 50px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                > span {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    ${props =>
                        props.noAddress == 1 &&
                        `
                    span::after {
                        content: 'unknown';
                        opacity: 0.3;
                    }
                    `}

                    > p {
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        ${props => props.noAddress == 1 && 'display: none;'}
                    }
                }

                #experiences {
                    margin-top: 20px;
                }
            }
        }

        #social {
            ${sideItemsStyle}
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            height: 50px;

            #noSocial {
                opacity: 0.3;
                width: 100%;
                text-align: center;
            }
        }
        #stars {
            ${sideItemsStyle}
            justify-content: center;
            flex-direction: row;
            flex-wrap: wrap;
            padding-top: 5px;
            padding-bottom: 10px;
            overflow: visible;

            #starredInfo {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                height: 50px;
                margin-bottom: 5px;
                #starredAmount {
                    display: flex;
                    margin-right: 5px;
                }
                #starredList {
                    display: flex;
                    flex: 1;
                    align-items: center;
                    justify-content: space-around;
                    padding-left: 30px;
                    width: 100%;
                    height: 50px;

                    padding: 0 5px 0 5px;
                    cursor: pointer;
                    > li {
                        list-style: none;
                    }
                }
                #moreStarreds {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    margin-right: 5px;
                    height: 40px;
                }
            }
            #starredButton {
                ${props => props.accountOwner == 1 && 'display: none;'}
            }
        }
    }

    > main {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;

        align-items: center;
        justify-content: center;

        width: 100%;
        min-width: 300px;

        margin: 10px 10px 100px 10px;
        border-radius: 0px 0px 20px 20px;

        /* @media (min-width: 941px) {
            margin-right: 20px;
            height: 100vh;
            position: relative;
            overflow: scroll;
        } */

        #filter {
            position: sticky;
            top: 0;
            z-index: 2;

            border: 10px 10px 0px 0px;
            border-radius: 10px 10px 0px 0px;

            display: flex;
            flex-direction: column;

            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
            box-shadow: ${props => props.theme.colors.shadow} 0px 5px 15px 5px;
            width: 100%;
            padding: 10px;

            transition-duration: 0.5s;

            #filterHeader {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;

                > h1 {
                    font-size: 20px;
                    margin-bottom: 10px;
                    margin-left: 5px;
                }

                #expandProfile {
                    display: flex;
                    justify-content: end;
                    padding-right: 5px;
                    cursor: pointer;

                    @media (min-width: 940px) {
                        display: none;
                    }

                    #iconExpand {
                        width: 30px;
                        height: 30px;
                    }

                    #pictureIcon {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }
                }
            }

            #input {
                display: flex;

                position: relative;
                #searchIcon {
                    position: absolute;
                    z-index: 2;
                    left: 10px;
                    top: 6px;
                }
                > input {
                    position: relative;
                    z-index: 1;

                    width: 100%;
                    height: 41px;
                    padding: 10px;
                    padding-left: 40px;
                    color: ${props => props.theme.colors.textOne};
                    background-color: ${props => props.theme.colors.background};
                    border: 1px solid ${props => props.theme.colors.tertiary};
                    border-radius: 10px 0px 0px 10px;
                }
                #buttonFilter {
                    position: relative;
                    z-index: 1;

                    width: 40px;
                    background-color: ${props =>
                        props.theme.colors.backgroundDetails};
                    border: 1px solid ${props => props.theme.colors.tertiary};
                    border-radius: 0px 10px 10px 0px;
                    /* border-left: none; */
                    cursor: pointer;
                    transition-duration: 0.3s;
                    :hover {
                        filter: brightness(150%);
                    }
                }
            }

            .filterOptionsWrapper {
                margin-top: 5px;
                overflow: hidden;
            }

            .filterOptions {
                width: 100%;

                display: flex;
                align-items: center;
                justify-content: center;

                transition-duration: 0.5s;
                margin-top: -150px;
                ${props => !props.noFilter == 1 && ' margin-top: 0px;'}

                @media (max-width: 420px) {
                    flex-direction: column;
                }

                .select,
                .select2 {
                    width: 100%;
                    height: 100%;
                    margin: 5px 5px 5px 0px;
                    @media (max-width: 420px) {
                        margin: 5px 0px 5px 0px;
                    }
                }

                .sortBy {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .select2 {
                    border-radius: 10px 0px 0px 10px;
                    margin: 5px 0px 5px 0px;
                }
            }

            > button {
                width: 40px;
                height: 100%;
                background-color: ${props =>
                    props.theme.colors.backgroundDetails};
                border: 3px solid ${props => props.theme.colors.secondary};
                border-radius: 0px 0px 5px 0px;
                border-top: none;
                border-left: none;
                cursor: pointer;
                transition-duration: 0.3s;
                :hover {
                    filter: brightness(150%);
                }
            }
            #arrowDownUp {
                display: flex;
                align-items: center;
                justify-content: center;

                height: 100%;
                min-height: 35px;
                max-width: 30px;

                border-left: 1px solid ${props => props.theme.colors.background};
                border-radius: 0px 10px 10px 0px;

                padding: 8px;
                background-color: ${props => props.theme.colors.secondary};
                cursor: pointer;
            }
        }

        #portfolios {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            padding: 5px;

            width: 100%;
            border: 5px solid ${props => props.theme.colors.primary};
            border-radius: 0px 0px 10px 10px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );

            #emptyFeed {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0.5;
            }
        }
    }
`

export const MapIcon = styled(Map)`
    width: 22px;
    height: 20px;
    margin-right: 5px;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.5;
`

const styleSocialIcons = css`
    width: 30px;
    height: 30px;
    cursor: pointer;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.5;
    transition-duration: 0.3s;
    :hover {
        opacity: 1;
    }
`

export const LinkedinIcon = styled(LinkedinWithCircle)`
    ${styleSocialIcons}
`
export const YoutubeIcon = styled(YoutubeWithCircle)`
    ${styleSocialIcons}
`
export const GithubIcon = styled(Github)`
    ${styleSocialIcons}
`
export const InstagramIcon = styled(InstagramWithCircle)`
    ${styleSocialIcons}
`
export const TwitterIcon = styled(TwitterWithCircle)`
    ${styleSocialIcons}
`

const ExpansionIcons = css`
    width: 40px;
    height: 40px;
    color: ${props => props.theme.colors.textTwo};
    cursor: pointer;
    opacity: 0.5;
    transition-duration: 0.3s;

    :hover {
        opacity: 1;
    }
`

export const ExpandLessIcon = styled(ExpandLess)`
    ${ExpansionIcons}
`
export const ExpandMoreIcon = styled(ExpandMore)`
    ${ExpansionIcons}
`

export const SearchIcon = styled(Search)`
    width: 20px;
    height: 20px;
    margin: 3px;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.3;
`

export const ListSettingsIcon = styled(ListSettings)`
    width: 20px;
    height: 20px;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.5;
    transition-duration: 0.3s;
    cursor: pointer;
    :hover {
        opacity: 1;
    }
`

export const UserFriendsIcon = styled(UserFriends)`
    width: 30px;
    height: 30px;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.5;
`

export const StarIcon = styled(Star)`
    width: 15px;
    height: 15px;
    color: #ff0;
`
export const StarBorderIcon = styled(StarBorder)`
    width: 15px;
    height: 15px;
    color: #ff0;
    opacity: 0.5;
`
export const StarsIcon = styled(Stars)`
    width: 20px;
    height: 20px;
    color: #ff0;
`
export const StarAddIcon = styled(StarAdd)`
    color: #555;
    width: 25px;
    height: 25px;
    cursor: pointer;
    transition-duration: 0.3s;
    :hover {
        color: #ff0;
    }
`
export const EditIcon = styled(Edit)`
    height: 20px;
    width: 20px;
    color: ${props => props.theme.colors.textOne};

    cursor: pointer;
    transition-duration: 0.3s;
    opacity: 0.5;
    :hover {
        opacity: 1;
    }
`
export const ArrowDownUpIcon = styled(ArrowDownUp)`
    height: 100%;
    width: 100%;
    color: ${props => props.theme.colors.textOne};

    transition-duration: 0.3s;
    cursor: pointer;
    :hover {
        opacity: 1;
    }
`

export const EmptyFeed = styled(EmptyFeedIcon).attrs(props => ({
    width: 100,
    height: 100,
    fill: `${props.theme.colors.tertiary}`
}))``
