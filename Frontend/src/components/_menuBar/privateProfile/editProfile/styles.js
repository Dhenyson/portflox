import styled, { css } from 'styled-components'
import {
    Edit,
    LinkedinWithCircle,
    YoutubeWithCircle,
    Github,
    InstagramWithCircle,
    TwitterWithCircle,
    EyeShow
} from '../../../icons'

const inputStyle = css`
    :disabled {
        opacity: 0.5;
    }

    width: 100%;
    min-width: 120px;
    min-height: 35px;
    padding: 0px 10px 0px 10px;

    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textOne};
    border-radius: 10px;

    ::-webkit-input-placeholder {
        color: ${props => props.theme.colors.textOne};
        opacity: 0.5;
        font-size: 12px;
    }

    :-moz-placeholder {
        color: ${props => props.theme.colors.textOne};
        opacity: 0.5;
        font-size: 12px;
    }

    ::-moz-placeholder {
        color: ${props => props.theme.colors.textOne};
        opacity: 0.5;
        font-size: 12px;
    }

    :-ms-input-placeholder {
        color: ${props => props.theme.colors.textOne};
        opacity: 0.5;
        font-size: 12px;
    }
`

export const ContainerEditProfile = styled.div`
    height: 80vh;
    max-height: 768px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    > form {
        height: 80%;
        overflow: scroll;

        > section,
        #social {
            width: 100%;

            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            > div {
                flex: 1;
                margin: 10px;
            }

            .currentAddress {
                min-height: 35px;
                padding-left: 5px;
                display: flex;
                align-items: center;
            }
        }

        .fieldButton {
            background-color: ${props => props.theme.colors.background};

            padding: 5px 0px 5px 10px;
            border-radius: 10px;

            cursor: pointer;
            text-align: center;
        }

        #social {
            flex-direction: column;
        }

        .label,
        .labelTwo {
            display: flex;
            color: ${props => props.theme.colors.textOne};
            opacity: 0.5;
            font-size: 12px;
            margin: 0px 0px 3px 5px;
        }

        .preInput {
            min-height: 35px;
            width: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 5px;
            background-color: ${props => props.theme.colors.secondary};
            border-radius: 10px 10px 0px 0px;

            font-size: 12px;

            @media (min-width: 420px) {
                max-width: 200px;
                justify-content: start;
                border-radius: 10px 0px 0px 10px;
            }
        }

        .inputDefault,
        .inputTwo {
            ${inputStyle}
        }

        .inputTwo {
            border-radius: 0px 10px 10px 0px;
            @media (max-width: 420px) {
                border-radius: 0px 0px 10px 10px;
            }
        }

        .selectDefault {
            height: auto;
        }

        .group {
            display: flex;
            align-items: center;
            @media (max-width: 420px) {
                flex-direction: column;
            }
        }
    }

    .modalPassword {
        display: flex;
        flex-direction: column;

        #firstInput {
            margin-bottom: 20px;
        }

        > p {
            margin-bottom: 10px;
            text-align: center;
        }

        .inputArea {
            position: relative;
        }

        > input,
        > div > input {
            margin-bottom: 10px;
            ${inputStyle}
        }

        .buttonsModal {
            display: flex;
            margin-bottom: 10px;
            #button {
                margin: 5px;
            }
        }
    }

    .actionButtons {
        width: 100%;
        max-width: 420px;

        padding: 10px 12px 10px 12px;

        display: flex;
        justify-content: space-between;
    }

    .emailNotConfirmed {
        color: #ff5e5e;
    }
    .resendLink {
        text-align: center;
        color: #ff0;
        opacity: 0.7;
        cursor: pointer;
    }
`

const styleSocialIcons = css`
    width: 20px;
    height: 20px;

    margin-right: 5px;

    color: ${props => props.theme.colors.textOne};
    opacity: 0.5;
    transition-duration: 0.3s;
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
export const EditIcon = styled(Edit)`
    width: 17px;
    height: 17px;
    min-width: 17px;
    min-height: 17px;

    margin-left: 5px;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.3;

    cursor: pointer;
    transition-duration: 0.3s;
    &:hover {
        opacity: 1;
    }
`

export const EyeShowIcon = styled(EyeShow)`
    width: 15px;
    min-width: 15px;
    height: 15px;
    min-height: 15px;

    position: absolute;
    top: 10px;
    right: 10px;

    cursor: pointer;
    opacity: 0.5;
    transition-duration: 0.3s;
    :hover {
        opacity: 1;
    }
`
