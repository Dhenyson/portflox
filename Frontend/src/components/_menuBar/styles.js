import styled, { css } from 'styled-components'
import {
    Settings,
    Notifications,
    PeopleSearch,
    Work,
    ListSettings
} from '../icons'

export const WrapperMenuBar = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    bottom: 5px;
    z-index: 3;

    background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    );

    box-shadow: ${props => props.theme.colors.shadow} 0px 0px 10px 5px;
    border: 1px solid ${props => props.theme.colors.tertiary};
    border-radius: 10px;

    @media (min-width: 640px) {
        max-width: 640px;
        border-radius: 10px;
    }

    .hidden {
        visibility: hidden;
    }

    .displayNone {
        display: none;
    }

    #squareProfileEffect {
        position: absolute;
        z-index: 2;
        width: 100px;
        height: 100%;
        border-bottom: 1px solid ${props => props.theme.colors.secondary};
        background-color: ${props => props.theme.colors.primary};
    }
    #circleProfileEffect {
        position: absolute;
        z-index: 1;
        margin-bottom: 30px;

        box-sizing: border-box;
        width: 61px;
        height: 61px;

        border-radius: 50%;
        background-color: ${props => props.theme.colors.tertiary};
    }
`

export const ContainerMenuBar = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-around;

    width: 100%;
    max-width: 500px;
    height: 100%;

    .containerProfileImg {
        width: 60px;
        height: 60px;
        overflow: hidden;

        position: relative;
        z-index: 3;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 28px;
        border-radius: 50%;

        cursor: pointer;
        background-color: #fff;
    }

    .picture {
        max-width: 70px;
        min-width: 70px;
        height: 70px;

        object-fit: cover;
        /* border: 3px solid
                    ${props => props.theme.colors.backgroundInverted}; */
        border-radius: 50%;
        padding: 5px;
        overflow: hidden;
        width: 100%;
    }
`

const StyleIcons = css`
    width: 25px;
    height: 25px;
    margin-bottom: 5px;

    cursor: pointer;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.6;
    transition-duration: 0.3s;

    :hover {
        color: ${props => props.theme.colors.tertiary};
    }
`

export const SettingsIcon = styled(Settings)`
    ${StyleIcons}
`
export const NotificationsIcon = styled(Notifications)`
    ${StyleIcons}
`
export const WorkIcon = styled(Work)`
    ${StyleIcons}
`
export const PeopleSearchIcon = styled(PeopleSearch)`
    ${StyleIcons}
`

export const FilterIcon = styled(ListSettings)`
    ${StyleIcons}
`

export const ProfileImage = styled.img`
    width: 100%;
    height: 100%;

    overflow: auto;
`
