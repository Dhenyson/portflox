import styled from 'styled-components'

export const ContainerMenuSelect = styled.div`
    width: 80px;
    height: 100%;
    min-height: 35px;

    padding-left: 5px;
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 10px 10px 10px 10px;

    display: flex;
    align-items: center;
    justify-content: center;

    transition-duration: 0.3s;
    :hover {
        filter: brightness(150%);
    }

    > select {
        width: 100%;
        height: 100%;
        color: ${props => props.theme.colors.textOne};

        border-radius: 10px 10px 10px 10px;
        cursor: pointer;

        > option {
            background-color: ${props => props.theme.colors.backgroundDetails};

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
    }
`
