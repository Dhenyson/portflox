import styled from 'styled-components'
import { Close } from '../../icons'

export const CloseIconContainer = styled.div`
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    border: 1px solid ${props => props.theme.colors.textOne};
    box-shadow: 0 0 5px ${props => props.theme.colors.shadow};
    background-color: ${props => props.theme.colors.backgroundDetails};

    cursor: pointer;
    transition: background 0.3s ease 0s;
    :hover {
        background-color: ${props => props.theme.colors.unauthenticated};
    }
`

export const CloseIcon = styled(Close)`
    width: 100%;
    height: 100%;
    ${props => props.theme.colors.textOne}
`
