import styled, { css } from 'styled-components'
import { EditMD, PreviewMD } from '../../styles/markdown'

export const WrapperAddPortfolio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* overflow: hidden; */

    padding-bottom: 80px;
    background-color: ${props => props.theme.colors.background};

    @media (max-width: 300px) {
        justify-content: normal;
    }
`
const LeftAndRigth = css`
    height: 100%;

    flex: 1;
    background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    );
    border-radius: 10px;

    margin-bottom: 20px;
    margin-right: 10px;
    padding: 20px 10px 10px 10px;

    @media (max-width: 619px) {
        margin-left: 0;
        margin-right: 0;
    }
`

export const ContainerAddPortfolio = styled.div`
    ${EditMD}
    ${PreviewMD}

    width: 100%;
    max-width: 1180px;

    position: relative;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;

    padding: 10px;

    .menu {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1;

        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        background: ${props => props.theme.colors.primary};
        background: radial-gradient(
            circle,
            ${props => props.theme.colors.primary},
            ${props => props.theme.colors.primary2}
        );
        margin-bottom: 20px;
        padding: 5px;

        border-radius: 10px;
        border-bottom: 1px solid ${props => props.theme.colors.secondary};
        box-shadow: ${props => props.theme.colors.shadow} 0px 10px 10px 1px;

        @media (max-width: 300px) {
            flex-direction: column;
        }

        .button {
            max-width: 50px;
        }
    }

    .inputAddPortfolio {
        width: 100%;
        height: 100%;
        min-height: 35px;

        padding: 5px 10px 5px 10px;
        color: ${props => props.theme.colors.textOne};
        background-color: ${props => props.theme.colors.background};
        border: 2px solid ${props => props.theme.colors.secondary};
        border-radius: 0px 10px 10px 10px;
        resize: none;

        ${props =>
            props.theme.title === 'blue' &&
            `background-color: #000000;
            color: ${props => props.theme.colors.textOne};
            `}
        ${props =>
            props.theme.title === 'light2' &&
            `background-color: #000000;
            color: #ffffff;
            `}
    }

    .headerInfos {
        @media (max-width: 640px) {
            flex-direction: column;
            .left,
            .right {
                width: 100%;
            }
        }
    }

    > div {
        width: 100%;

        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;

        @media (max-width: 940px) {
            width: 100%;
        }

        .left {
            ${LeftAndRigth}

            #menuSelect {
                display: flex;
                align-items: center;
                justify-content: start;
                overflow: visible;

                #labelCategory {
                    box-shadow: none;
                    border: none;
                }

                .select {
                    height: 100%;
                    border-radius: 0 10px 10px 0;
                    border: 1px solid ${props => props.theme.colors.secondary};
                }

                @media (max-width: 300px) {
                    flex-direction: column;
                    #labelCategory {
                        width: 100%;
                        border-radius: 10px 10px 0px 0px;
                        text-align: center;
                    }
                    .select {
                        border-radius: 0px 0px 10px 10px;
                    }
                }
            }

            > div {
                width: 100%;
                min-height: 35px;

                position: relative;

                display: flex;
                align-items: center;
                justify-content: center;

                margin-bottom: 20px;

                > label {
                    min-width: 40px;
                    height: 100%;
                    min-height: 35px;

                    display: flex;
                    align-items: center;

                    padding: 0 5px 0 5px;
                    background-color: ${props => props.theme.colors.secondary};

                    border-radius: 10px 0 0 10px;
                    font-size: 14px;
                }

                #inputTags {
                    border: 2px solid ${props => props.theme.colors.secondary};
                    border-radius: 0px 10px 10px 0px;
                    > input {
                        width: 100%;
                    }
                }
            }
            #title {
                > input {
                    border-radius: 0px 10px 10px 0px !important;
                }
            }
        }
        .right {
            ${LeftAndRigth}
            margin-right: 0px;
            > div {
                > label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: ${props => props.theme.colors.secondary};
                    width: 100px;
                    height: 30px;
                    padding: 0 5px 0 5px;
                    border-radius: 10px 10px 0 0;
                }
            }

            > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-bottom: 20px;
                width: 100%;
            }
        }
    }

    > main {
        width: 100%;

        .addImages {
            width: 100%;

            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            padding: 20px;
            margin-bottom: 20px;

            text-align: center;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
            border-radius: 10px;

            #area {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
            }

            #dropZoneItem {
                margin: 5px;
            }
        }

        #mdEditorArea {
            width: 100%;
            padding: 10px;
            border-radius: 10px 10px 0px 0px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );
        }
        #preview {
            margin-top: -1px;
            width: 100%;
            padding: 10px;
            border-radius: 0 0 10px 10px;
            background: ${props => props.theme.colors.primary};
            background: radial-gradient(
                circle,
                ${props => props.theme.colors.primary},
                ${props => props.theme.colors.primary2}
            );

            > div > div {
                > p,
                > h1,
                > h2,
                > h3,
                > h4,
                > h5,
                > h6,
                > ul,
                > ol,
                > li {
                    color: ${props => props.theme.colors.textOne};
                }

                > p > code {
                    color: #ccc;
                }
            }
        }
    }
`

export const Length = styled.div`
    width: 110px;
    height: 40px;
    border-radius: 10px;
    box-shadow: ${props => props.theme.colors.shadow} 0px 0px 5px 2px;
    font-size: 10px;
    transition-duration: 0.3s;

    ${props => props.visibility == 0 && 'opacity: 0;'}
    #field {
        text-align: center;
        background-color: ${props => props.theme.colors.secondary};
        width: 100%;
        padding-left: 3px;
        border-radius: 10px 10px 0px 0px;
    }

    #lengths {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px;
        padding-top: 0;
        text-align: center;
        font-size: 9px;
    }
`
