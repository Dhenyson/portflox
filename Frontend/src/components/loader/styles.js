import styled from 'styled-components'
import EmptyLogoIcon from '../icons/emptyLogo'
import { Star } from '../icons'

export const ContainerLoading = styled.div`
    ${props => props.visibility == 0 && 'display: none;'}
    width: 100%;

    position: fixed;
    z-index: 10;
    top: 0px;

    .bar {
        position: absolute;
        height: 0.1rem;
        width: 100vw;

        margin-top: 2px;
        border-radius: 3px;
        opacity: 0.7;
        background-color: ${props => props.theme.colors.backgroundInverted};
        animation: 3s animate infinite ease-in-out both;
        @media (max-width: 320px) {
            animation: 3s animate2 infinite ease-in-out both;
        }
    }

    @keyframes animate {
        from {
            margin-left: -100vw;
        }
        to {
            margin-left: 100vw;
        }
    }
    @keyframes animate2 {
        from {
            margin-left: -100%;
        }
        to {
            margin-left: 100%;
        }
    }
`
