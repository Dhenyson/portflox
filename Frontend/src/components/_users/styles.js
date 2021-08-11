import styled from 'styled-components'
import { ArrowDownUp, ExpandLess } from '../icons'

export const WrapperUsers = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    #filterMenu {
        transition-duration: 0.5s;
        position: fixed;
        z-index: 1;

        top: -80px;
        margin-top: -200px;
        opacity: 0;
        ${props =>
            props.filterMenuVisibility == 1 &&
            `
                top: 0;
                margin-top: 0px;
                opacity: 1;

            `}

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        max-width: 640px;

        padding: 5px 30px 10px 30px;

        border-radius: 0px 0px 10px 10px;
        box-shadow: ${props => props.theme.colors.shadow} 0px 20px 30px;

        background: ${props => props.theme.colors.primary};
        background: radial-gradient(
            circle,
            ${props => props.theme.colors.primary},
            ${props => props.theme.colors.primary2}
        );

        #lineOne {
            width: 100%;
            min-height: 35px;

            display: flex;

            border-radius: 10px;
            margin: 5px 0px 5px 0px;

            @media (max-width: 400px) {
                flex-direction: column;
            }

            #selectTypeSearch {
                flex: 1;
                min-width: 160px;
                height: 100%;
                border: none;
                border-radius: 10px 0px 0px 10px;

                @media (max-width: 400px) {
                    border-radius: 10px 10px 0px 0px;
                }
            }

            .inputOne {
                display: flex;
                flex: 4;
                padding-left: 5px;
                border-radius: 0px 10px 10px 0px;
                border: 2px solid ${props => props.theme.colors.secondary};

                @media (max-width: 400px) {
                    border-radius: 0px 0px 10px 10px;
                }
            }
        }

        #lineTwo {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;

            #selects {
                display: flex;
                align-items: center;
                justify-content: space-between;

                width: 100%;
                /* border: 1px solid ${props => props.theme.colors.tertiary};
                border-top: 1px solid ${props =>
                    props.theme.colors.background}; */
                border-radius: 0px 0px 5px 5px;

                @media (max-width: 640px) {
                    flex-wrap: wrap;
                    border-top: none;
                }

                .region {
                    width: 200%;
                    height: 100%;
                    display: flex;

                    #selectCountry,
                    #selectState {
                        min-height: 35px;
                        margin: 5px 0px 5px 0px;
                    }

                    @media (min-width: 640px) {
                        #selectCountry {
                            margin-right: 5px;
                        }
                        #selectState {
                            margin-left: 5px;
                        }
                    }

                    > div {
                        width: 100%;
                    }
                    .css-yk16xz-control,
                    .css-1pahdxg-control {
                        min-height: 25px;
                        min-width: 230px;
                        background-color: ${props =>
                            props.theme.colors.secondary};
                        border: none;
                        border-radius: 5px;
                        margin: 5px 0px 5px 0px;

                        .css-b8ldur-Input {
                            color: ${props => props.theme.colors.textOne};
                        }

                        .css-1rhbuit-multiValue {
                            background-color: ${props =>
                                props.theme.colors.tertiary};
                            > div {
                                color: ${props => props.theme.colors.textOne};
                            }
                        }

                        .css-1okebmr-indicatorSeparator {
                            display: none;
                        }
                        .css-xb97g8 {
                            :hover {
                                background-color: #900;
                            }
                        }
                    }
                    .css-26l3qy-menu {
                        border: 1px solid
                            ${props => props.theme.colors.tertiary};
                        background-color: ${props =>
                            props.theme.colors.primary};
                        > div {
                            > div {
                                background-color: ${props =>
                                    props.theme.colors.primary};
                                :hover {
                                    background-color: ${props =>
                                        props.theme.colors.tertiary};
                                }
                            }
                        }
                    }

                    /* Meu disativado "isDisabled" */
                    .css-1fhf3k1-control {
                        background-color: ${props =>
                            props.theme.colors.secondary};
                        border: none;
                        opacity: 0.2;
                    }
                }
            }

            #lineThree {
                width: 100%;

                display: flex;
                flex-wrap: wrap;
                min-height: 35px;
                margin: 5px auto 0px 0px;

                .inputCity {
                    max-width: 440px;
                    min-width: 150px;
                    min-height: 35px;
                    border-radius: 10px;
                    margin: 0px 0px 10px 0px;

                    border: 2px solid ${props => props.theme.colors.secondary};
                    @media (min-width: 630px) {
                        margin-right: 10px;
                    }
                    @media (max-width: 640px) {
                        max-width: 100%;
                        margin-right: 0px;
                    }
                }
                #sortBy {
                    height: 100%;
                    max-height: 35px;
                    min-width: 130px;

                    display: flex;

                    left: auto;

                    #selectSort {
                        border-radius: 10px 0px 0px 10px;
                        border: none;
                        min-width: 100px;
                    }

                    #arrowDownUp {
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        height: 100%;
                        min-height: 35px;
                        max-width: 30px;
                        padding: 8px;
                        border-radius: 0px 10px 10px 0px;
                        background-color: ${props =>
                            props.theme.colors.secondary};
                        border: 1px solid
                            ${props => props.theme.colors.secondary};
                        border-left: 1px solid
                            ${props => props.theme.colors.background};
                        cursor: pointer;
                        :hover {
                            filter: brightness(120%);
                        }
                    }
                }
            }
        }
    }

    #userList {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        padding-bottom: 100px;
        overflow: scroll;

        transition-duration: 0.3s;
        ${props => props.filterMenuVisibility == 1 && 'margin-top: 160px;'}

        > li {
            list-style: none;
        }
    }

    #empty {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100vw;
        height: 100vh;

        opacity: 0.5;
    }
`

export const ArrowDownUpIcon = styled(ArrowDownUp)`
    height: 100%;
    width: 100%;
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
