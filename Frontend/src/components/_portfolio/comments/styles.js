import styled from 'styled-components'

export const WrapperComments = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    ${props => props.visibility == 0 && 'display: none;'}

    .background {
        position: absolute;
        z-index: 1;

        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colors.background};
        opacity: 0.9;
    }
`

export const ContainerComments = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    max-width: 640px;
    height: 100%;
    max-height: 860px;

    padding: 10px;
    border-radius: 10px;
    opacity: 1;

    /* background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    ); */
    background-color: ${props => props.theme.colors.primary};

    .comments {
        width: 100%;
        height: 90%;
        overflow: scroll;

        border-radius: 10px;
        background-color: ${props => props.theme.colors.background};
        #commentItemPreview {
            margin: 20px 10px 20px 10px;
        }
    }

    #toComment {
        display: flex;
        align-items: flex-end;
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        > textarea {
            width: 100%;
            border: 2px solid ${props => props.theme.colors.tertiary};
            border-radius: 10px 0 0 10px;
            background-color: ${props => props.theme.colors.background};
            color: ${props => props.theme.colors.textOne};
            padding: 6px 5px 0 5px;
            resize: none;

            ${props =>
                props.theme.title === 'blue' &&
                `background-color: #000000;
            color: ${props => props.theme.colors.textOne};
            `}
            ${props =>
                props.theme.title === 'light2' &&
                `background-color: #000000;
            color: #ffffff;
            `}
        }
        > button {
            cursor: pointer;
            width: 60px;
            height: 40px;
            border: 2px solid ${props => props.theme.colors.tertiary};
            border-radius: 0 10px 10px 0;
            background-color: ${props => props.theme.colors.tertiary};
            color: ${props => props.theme.colors.textOne};
            transition-duration: 0.3s;
            :hover {
                filter: brightness(150%);
            }
        }
    }
    #closeButton {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: auto;
        width: 100%;
    }
`
