import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    transition-duration: 0.5s;

    .visible {
        opacity: 0.9;
    }
    .invisible {
        opacity: 0;
        visibility: hidden;
    }
`

export const BlurBackground = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: ${props => props.theme.colors.background};
    opacity: 0.4;

    transition-duration: 0.5s;
`
