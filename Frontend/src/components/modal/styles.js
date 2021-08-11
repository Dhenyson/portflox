import styled from 'styled-components'

export const WrapperModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
    min-width: 100vw;
    min-height: 100vh;

    ${props => props.visibility == 0 && 'display: none'};

    .containerModal {
        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;
        z-index: 5;
        border-radius: 20px;
        padding: 10px;
        background-color: ${props => props.theme.colors.primary};
    }

    .background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 4;
        width: 100%;
        height: 100%;
        min-width: 100vw;
        min-height: 100vh;

        background-color: ${props => props.theme.colors.background};
        opacity: 0.9;
    }
`
