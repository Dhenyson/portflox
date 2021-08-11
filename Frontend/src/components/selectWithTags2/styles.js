import styled from 'styled-components'
import { Close, ExpandMore, ExpandLess } from '../icons'

export const Select = styled.div`
    position: relative;

    width: 100%;
    height: 100%;
    min-height: 35px;

    display: flex;
    /* flex-wrap: wrap; */
    align-items: center;
    justify-content: space-between;

    border-radius: 10px;
    border: 1px solid ${props => props.theme.colors.backgroundDetails};

    background-color: ${props => props.theme.colors.secondary};

    ${props => (props.disabled == 1 || props.off == 1) && 'opacity: 0.5;'}

    > div {
        flex: 1;
        display: flex;
        flex-wrap: wrap;

        .tagsArea {
            display: flex;
            flex-wrap: wrap;

            > li {
                display: flex;
                align-items: center;

                list-style: none;
                padding: 1px 5px 3px 5px;
                border-radius: 5px;
                margin: 3px;
                background-color: ${props => props.theme.colors.tertiary};
                cursor: default;

                ${props => props.tagStyle == 2 && 'background: none;'}
                ${props => props.tagStyle == 0 && 'background: none;'}

                :hover {
                    filter: brightness(130%);
                    #closeIcon {
                        background-color: #f00;
                    }
                }
            }
        }

        > input {
            ${props =>
                props.singleTag && props.valueLength >= 1 && 'display: none;'}

            flex: 1;
            width: 100%;
            min-width: 80px;
            height: 100%;
            margin: 0px 10px 0px 10px;
            padding: 4px 15px 4px 4px;

            color: ${props => props.theme.colors.textOne};
        }
    }

    .options {
        position: absolute;
        z-index: 3;
        top: 105%;

        width: 100%;
        max-height: 200px;
        overflow: scroll;

        display: flex;
        flex-direction: column;
        border-radius: 10px;

        ${props => props.showOptions === 0 && 'display: none;'}

        .optionsArea {
            display: flex;
            flex-direction: column;

            background-color: ${props => props.theme.colors.secondary};

            > li {
                background-color: ${props => props.theme.colors.secondary};
                padding: 5px;
                cursor: default;

                :hover {
                    filter: brightness(130%);
                }
            }
            .selected {
                filter: brightness(130%);
            }
        }
    }
`

export const CloseIcon = styled(Close)`
    ${props => props.tagStyle == 3 && 'display: none;'}
    ${props => props.tagStyle == 0 && 'display: none;'}

    width: 10px;
    height: 10px;

    margin: 0px 0px 0px 3px;

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
export const ExpandMoreIcon = styled(ExpandMore)`
    width: 15px;
    height: 15px;
    margin-right: 10px;
    cursor: pointer;
    ${props => (props.disabled == 1 || props.off == 1) && 'cursor: default;'}
`
export const ExpandLessIcon = styled(ExpandLess)`
    width: 15px;
    height: 15px;
    margin-right: 10px;
    cursor: pointer;
    ${props => (props.disabled == 1 || props.off == 1) && 'cursor: default;'}
`
