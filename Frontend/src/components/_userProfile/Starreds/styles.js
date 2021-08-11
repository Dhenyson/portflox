import styled from 'styled-components'
import { ListSettings, ArrowDownUp, ExpandMore, ExpandLess } from '../../icons'

export const StarredContainer = styled.div`
    height: 85vh;
    max-width: 640px;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .filter {
        width: 100%;

        #filterMenu {
            transition-duration: 0.5s;
            display: none;
            overflow: hidden;

            opacity: 0.5;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            width: 100%;
            max-width: 640px;

            padding: 5px 30px 10px 30px;

            border-radius: 0px 0px 20px 20px;

            ${props =>
                props.filterMenuVisibility == 0 &&
                `
                margin-top: -100px;
                display: none;
                opacity: 1;
            `}

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
                                    color: ${props =>
                                        props.theme.colors.textOne};
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

                        border: 2px solid
                            ${props => props.theme.colors.secondary};
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

        .filterBtn {
            display: flex;
            align-items: center;
            justify-content: center;

            transition-duration: 0.5s;
            width: 100%;
        }
    }

    .expandBtn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 0px 0px 10px 10px;
        border-bottom: 1px solid ${props => props.theme.colors.secondary};

        /* box-shadow: ${props => props.theme.colors.shadow} 0px 40px 60px; */
    }

    > ul {
        width: 100%;
        height: 85%;
        overflow: scroll;

        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        > li {
            list-style: none;
            margin: 5px;
        }
    }

    .cardStarred {
        margin: 10px 0 0 0;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 10px;
        margin-bottom: auto;
        width: 100%;
    }
`
export const ListSettingsIcon = styled(ListSettings)`
    width: 30px;
    height: 30px;
    cursor: pointer;
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

export const ExpandMoreIcon = styled(ExpandMore)`
    width: 30px;
    height: 30px;
`
export const ExpandLessIcon = styled(ExpandLess)`
    width: 30px;
    height: 30px;
`
