import styled, { css } from 'styled-components'
import { Map, Stars, Work } from '../icons'

export const ContainerItemMoreStarred = styled.div`
    width: 100%;
    max-width: 420px;
    height: 320px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 360px;
    height: 240px;
    padding: 10px;
    margin: 10px;
    overflow: hidden;

    border-radius: 20px;

    border: 1px solid ${props => props.theme.colors.secondary};
    background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    );

    cursor: pointer;

    transition-duration: 0.3s;
    :hover {
        filter: brightness(120%);
    }

    #viewProfile {
        position: absolute;
        z-index: 1;
        top: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
        background: ${props => props.theme.colors.primary};
        background: radial-gradient(
            circle,
            ${props => props.theme.colors.primary},
            ${props => props.theme.colors.primary2}
        );

        ${props => props.showViewProfile == 0 && 'display: none'}
    }

    #picturePortStars {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        #profilePicture {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 100px;
            height: 100px;
            padding: 3px;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 5px;

            border: 3px solid ${props => props.theme.colors.tertiary};

            > img {
                width: 100%;
                min-width: 100%;
                min-height: 100%;
                border-radius: 50%;
            }
        }
        #portfoliosAndStars {
            display: flex;
            > div {
                display: flex;
                align-items: center;
            }
        }
    }
    #infos {
        text-align: center;
        width: 100%;
        #address {
            margin-top: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            > p {
                font-size: 12px;
                max-width: 100px;

                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
        #name {
            margin-top: 5px;
            font-weight: bold;
            opacity: 0.8;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    }

    #bio {
        min-width: 300px;
        margin-top: 10px;
        font-size: 13px;
        text-align: center;
        /* opacity: 0.5; */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`

const IconStyle = css`
    width: 13px;
    height: 13px;
    margin-right: 3px;
    min-width: 10px;
    color: ${props => props.theme.colors.texOne};
    opacity: 0.5;
`
export const MapIcon = styled(Map)`
    ${IconStyle}
    color: #0ff;
`
export const StarsIcon = styled(Stars)`
    ${IconStyle}
    color: #ff0;
    opacity: 1;
`
export const WorkIcon = styled(Work)`
    ${IconStyle}
`
