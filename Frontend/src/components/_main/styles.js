import styled, { css } from 'styled-components'
import EmptyFeedIcon from '../icons/programmerPortfolio'
import { ArrowDownUp, ExpandLess } from '../icons'

const flexDefault = css`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const WrapperMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    #filterMenu {
        width: 100%;
        max-width: 640px;

        position: fixed;
        z-index: 2;

        top: -80px;
        margin-top: -320px;
        opacity: 0;
        transition-duration: 0.5s;
        ${props =>
            props.filterMenuVisibility == 1 &&
            `
                top: 0px;
                margin-top: 0px;
                opacity: 1;

            `}

        ${flexDefault}
        flex-direction: column;

        padding: 5px 30px 10px 30px;
        @media (max-width: 420px) {
            padding: 5px 10px 10px 10px;
        }

        border-radius: 0px 0px 10px 10px;
        box-shadow: ${props => props.theme.colors.shadow} 0px 30px 50px;

        background: ${props => props.theme.colors.primary};
        background: linear-gradient(
            180deg,
            ${props => props.theme.colors.primary2},
            ${props => props.theme.colors.primary}
        );

        .label {
            width: 100%;
            text-align: center;
            margin-top: 10px;
        }
    }

    .lineOne,
    .lineTwo,
    .lineThree,
    .lineFour {
        width: 100%;
        ${flexDefault}

        @media(max-width: 420px) {
            flex-direction: column;
        }

        .itemFilter {
            margin: 5px;
            flex: 1;
            width: 100%;
        }

        .input {
            border-radius: 10px;
            > input {
                width: 100%;
            }
        }

        .sortBy {
            ${flexDefault}
            @media(max-width: 166px) {
                flex-wrap: wrap;
            }

            .sortSelect {
                min-width: 120px;
                @media (max-with: 420px) {
                    min-width: 50px;
                }
                border-radius: 10px 0px 0px 10px;
                margin-right: 0;

                @media (max-width: 166px) {
                    border-radius: 10px;
                    margin-right: 5px;
                }
            }
            .arrowDownUp {
                background-color: ${props => props.theme.colors.secondary};
                min-height: 35px;
                max-width: 35px;
                ${flexDefault}

                padding: 5px;
                margin-left: 0;
                border-radius: 0px 10px 10px 0px;
                border-left: 1px solid ${props => props.theme.colors.background};

                cursor: pointer;
                :hover {
                    filter: brightness(150%);
                }

                @media (max-width: 166px) {
                    flex-wrap: wrap;
                    border-radius: 50%;
                    border-left: none;
                }
            }
        }
    }

    .portfoliosContainerMain {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        padding-bottom: 100px;
        overflow: scroll;

        transition-duration: 0.3s;
        ${props =>
            props.filterMenuVisibility == 1 &&
            'margin-top: 85px;'}/* @media (max-width: 640px) {
            padding: 5px 10px 5px 9px;
        } */
    }

    .emptyFeed {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100vw;
        height: 100vh;

        > p {
            opacity: 0.4;
        }
    }
    .hidden {
        visibility: hidden;
    }

    .displayNone {
        display: none;
    }
`

export const EmptyFeed = styled(EmptyFeedIcon).attrs(props => ({
    width: 100,
    height: 100,
    fill: `${props.theme.colors.primary}`
}))``

export const ArrowDownUpIcon = styled(ArrowDownUp)`
    height: 15px;
    width: 15px;

    color: ${props => props.theme.colors.textOne};

    transition-duration: 0.3s;
    cursor: pointer;
    :hover {
        opacity: 1;
    }
`
export const ExpandLessIcon = styled(ExpandLess)`
    height: 30px;
    width: 30px;

    margin-bottom: -10px;

    color: ${props => props.theme.colors.textOne};

    cursor: pointer;
    transition-duration: 0.3s;
    opacity: 0.3;
    :hover {
        opacity: 1;
    }
`
