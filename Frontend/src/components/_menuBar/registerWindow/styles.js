import styled from 'styled-components'
import { EyeShow } from '../../icons'

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;

    width: 100%;

    > label {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    > label > input {
        position: relative;
        box-sizing: border-box;

        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.textOne};

        width: 100%;
        max-width: 360px;
        height: 40px;
        border: 2px solid ${props => props.theme.colors.backgroundDetails};
        border-radius: 10px;

        font-size: 20px;
        text-align: center;

        @media (max-height: 400px) {
            font-size: 18px;
        }
    }

    .passwordContainer {
        position: relative;
        margin-bottom: 20px;
        max-width: 360px;
    }

    .showPassword {
        position: absolute;
        right: 15px;
        top: 8px;
    }
`
export const EyeShowIcon = styled(EyeShow)`
    width: 20px;
    height: 20px;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.5;

    cursor: pointer;
`
