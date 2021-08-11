import styled from 'styled-components'

export const ContainterViewImage = styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    overflow: scroll;
    background-color: ${props => props.theme.colors.primary};

    ${props => props.visibility == 0 && 'display: none;'}

    > img {
        width: auto;
        max-width: 90vw;
        height: auto;
        max-height: 70vh;
        margin-top: auto;
        margin-bottom: auto;
    }

    .close {
        position: fixed;
        z-index: 5;
        margin-top: auto;
        margin-bottom: 20px;
        bottom: 20px;
    }
`
