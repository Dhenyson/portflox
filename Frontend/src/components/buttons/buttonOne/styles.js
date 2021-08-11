import styled from 'styled-components'

export const Wrapper = styled.div`
    height: 35px;
    ${props =>
        props.minWidth ? `min-width: ${props.minWidth};` : 'min-width: 100px;'}

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        box-sizing: border-box;
        background: ${props => props.theme.colors.secondary};
        background: linear-gradient(
            180deg,
            ${props => props.theme.colors.secondary} 0%,
            ${props => props.theme.colors.secondary2} 100%
        );
        border: 2px solid ${props => props.theme.colors.secondary};
        ${props => props.type == 2 && 'background: none;'}
        ${props => props.type != 2 && 'border: none;'}
        border-radius: 10px;
        box-shadow: 0 0 5px 1px ${props => props.theme.colors.shadow};

        transition-duration: 0.3s;

        display: flex;
        align-items: center;
        justify-content: center;

        :hover {
            width: 100%;
            height: 100%;
            filter: brightness(150%);
        }
    }

    div > p {
        color: ${props => props.theme.colors.textOne};
        text-align: center;
        font-size: 14px;
        margin: 0px 5px 0px 5px;
    }

    > div:hove {
    }

    cursor: pointer;
`
