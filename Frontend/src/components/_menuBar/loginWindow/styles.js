import styled, { css } from 'styled-components'
import { EyeShow, Facebook, Github, Google3 } from '../../icons'

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;

    width: 100%;

    > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    > input,
    > div > input {
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
    }

    .pswdArea {
        position: relative;
        margin-top: 20px;
        max-width: 360px;
    }

    .showPassword {
        position: absolute;
        right: 15px;
        top: 8px;
    }

    .forgetPassword {
        /* width: 100%; */
        text-align: center;
        margin-top: 10px;
        cursor: pointer;
    }
`

export const OptionalAuth = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 200px;

    .optionalAuthItem:hover {
        transition: color 0.3s ease 0s;
        color: ${props => props.theme.colors.authenticated};
    }
`

export const EyeShowIcon = styled(EyeShow)`
    width: 20px;
    height: 20px;
    color: ${props => props.theme.colors.textOne};
    opacity: 0.5;

    cursor: pointer;
`
const iconsStyle = css`
    width: 40px;
    height: 40px;
    cursor: pointer;
`
export const FacebookIcon = styled(Facebook)`
    ${iconsStyle}
`
export const GithubIcon = styled(Github)`
    ${iconsStyle}
`
export const GoogleIcon = styled(Google3)`
    ${iconsStyle}
`
