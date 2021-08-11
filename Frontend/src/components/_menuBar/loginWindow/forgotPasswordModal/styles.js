import styled from 'styled-components'

export const ContainerModalForgotPassword = styled.div`
    width: 100%;
    max-width: 420px;

    > p {
        text-align: center;
        margin-bottom: 5px;
    }

    > input {
        margin-bottom: 5px;
        :disabled {
            opacity: 0.5;
        }

        width: 100%;
        min-width: 120px;
        min-height: 35px;
        padding: 0px 10px 0px 10px;

        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.textOne};
        border-radius: 10px;

        ::-webkit-input-placeholder {
            color: ${props => props.theme.colors.textOne};
            opacity: 0.5;
            font-size: 12px;
        }

        :-moz-placeholder {
            color: ${props => props.theme.colors.textOne};
            opacity: 0.5;
            font-size: 12px;
        }

        ::-moz-placeholder {
            color: ${props => props.theme.colors.textOne};
            opacity: 0.5;
            font-size: 12px;
        }

        :-ms-input-placeholder {
            color: ${props => props.theme.colors.textOne};
            opacity: 0.5;
            font-size: 12px;
        }
    }

    .buttons {
        display: flex;
        justify-content: space-between;

        #buttonOne,
        #buttonTwo {
            margin: 5px;
        }
    }
`
