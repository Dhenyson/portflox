import styled from 'styled-components'
import { Edit, UserFriends, Stars } from '../../icons'

export const ProgressBarContainer = styled.div`
    height: 12px;
    width: 90%;
    border-radius: 5px;
    background-color: ${props => props.theme.colors.tertiary};
    filter: brightness(150%);

    position: absolute;
    top: 10px;

    .progress-bar-value {
        transition-duration: 1s;
        height: 100%;
        background-color: ${props => props.theme.colors.textTwo};
        border-radius: 5px 0px 0px 5px;
    }

    .progress-percentage {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        text-align: center;

        color: ${props => props.theme.colors.textOne};
        width: 100%;
        transition-duration: 1s;

        > span {
            width: 25px;
            opacity: 50%;
        }
    }
`

export const ProfileOverview2 = styled.div`
    width: 100%;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .profile-image-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 3px solid ${props => props.theme.colors.backgroundInverted};
        overflow: hidden;

        > img {
            width: 100%;
            height: auto;
            min-height: 100%;
        }

        .edit-picture {
            position: absolute;
            width: 100%;
            height: 80%;
            top: 100%;

            opacity: 0.7;
            text-align: center;
            transition-duration: 0.5s;
            cursor: pointer;
            font-size: 16px;
            > div > p {
                width: 100%;
                height: 40px;
                padding-top: 5px;
                background-color: ${props => props.theme.colors.background};
            }
        }
    }

    .profile-image-container:hover > .edit-picture {
        top: 50%;
    }

    > p {
        text-align: center;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
    }

    .view-edit-profile {
        display: flex;
        position: relative;
    }

    @media (max-height: 640px) {
        padding-top: 20px;
    }
`

export const Followers = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    > p {
        padding-left: 10px;
    }
`

export const EditIcon = styled(Edit)`
    position: absolute;
    top: 5px;
    right: -25px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.3;
    transition-duration: 0.5s;

    :hover {
        opacity: 1;
    }
`
export const StarsIcon = styled(Stars)`
    width: 20px;
    height: 20px;

    top: -2px;
    right: -40px;

    color: #ff0;

    opacity: 0.8;
    transition-duration: 0.5s;
    :hover {
        opacity: 1;
    }
`
