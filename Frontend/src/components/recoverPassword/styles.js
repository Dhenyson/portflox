import styled from 'styled-components'
import { EyeShow } from '../icons'

export const ContainerRecoverPassword = styled.div`
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .wrapper {
        max-width: 420px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: ${props => props.theme.colors.primary};
        border-radius: 10px;
        padding: 10px;

        .inputArea {
            position: relative;
        }

        > p,
        > input,
        .inputArea > input,
        #button {
            margin: 5px 0px 5px 0px;
        }

        > input,
        .inputArea > input {
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
    }
`

export const EyeShowIcon = styled(EyeShow)`
    width: 15px;
    height: 15px;
    min-height: 15px;
    min-width: 15px;

    position: absolute;
    top: 16px;
    right: 10px;

    cursor: pointer;
    opacity: 0.5;
    transition-duration: 0.3s;
    :hover {
        opacity: 1;
    }
`
