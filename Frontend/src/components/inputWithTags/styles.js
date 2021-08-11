import styled from 'styled-components'
import { Close } from '../icons'

export const Input = styled.div`
    width: 100%;
    min-height: 35px;
    padding: 0px 10px 0px 10px;

    display: flex;
    flex-wrap: wrap;
    align-items: center;

    border: 1px solid ${props => props.theme.colors.backgroundDetails};

    background-color: ${props => props.theme.colors.background};

    > ul {
        display: flex;
        flex-wrap: wrap;

        > li {
            list-style: none;
            padding: 1px 5px 3px 5px;
            border-radius: 5px;
            margin: 5px 5px 5px 5px;
            background-color: ${props => props.theme.colors.secondary};
            cursor: default;
            transition-duration: 0.3s;
            :hover {
                filter: brightness(130%);
                #closeIcon {
                    background-color: #f00;
                }
            }
        }
    }

    > input {
        flex: 1;
        padding: 4px;
        color: ${props => props.theme.colors.textOne};

        ${props =>
            (props.hiddenInput === 0 || props.limitTags === 0) &&
            'display: none;'}
    }
`

export const CloseIcon = styled(Close)`
    width: 10px;
    height: 10px;

    border-radius: 50%;
    color: ${props => props.theme.colors.textOne};
    background-color: ${props => props.theme.colors.backgroundDetails};

    cursor: pointer;
    opacity: 0.5;

    transition-duration: 0.3s;
    :hover {
        opacity: 1;
        background-color: #f00;
    }
`
