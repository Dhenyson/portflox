import styled from 'styled-components'
import { Report, DeleteForever, Edit } from '../../icons'

export const ContainerCommentsPreview = styled.div`
    width: 100%;
    .modalEditComment {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        max-width: 640px;
        height: 100%;
        max-height: 800px;
        > textarea {
            width: 100%;
            border: 2px solid ${props => props.theme.colors.tertiary};
            border-radius: 5px 5px 5px 5px;
            background-color: ${props => props.theme.colors.background};
            color: ${props => props.theme.colors.textOne};
            padding: 6px 5px 0 5px;
            resize: none;
        }
        #buttons {
            display: flex;
            #btn {
                margin: 10px;
            }
        }
    }
    #modalOldcomment {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        max-width: 620px;
        max-height: 80vh;

        > p {
            font-weight: bold;
            margin-bottom: 10px;
        }
        #oldCommentArea {
            background-color: ${props => props.theme.colors.backgroundDetails};
            border-radius: 5px;
            padding: 10px;
            overflow: scroll;
            .oldCommentItem {
                display: flex;
                flex-direction: column;

                padding: 10px;
                margin: 10px 0 20px 0;
                border-radius: 5px;
                background-color: ${props => props.theme.colors.primary};
                box-shadow: ${props => props.theme.colors.shadow} 2px 2px 5px
                    1px;
                .oldComment {
                    opacity: 0.7;
                }
                .oldDate {
                    margin-top: 10px;
                    margin-left: auto;
                }
            }
        }

        #btnOldCommentModal {
            max-width: 100px;
            margin-top: 10px;
            height: 50px;
        }
    }
    #commentItem {
        display: flex;
        align-items: flex-start;
        width: 100%;
        min-height: 70px;
        #commentImg {
            display: flex;
            align-items: center;
            justify-content: center;

            width: 50px;
            min-width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;

            ${props => props.type != 'preview' && 'cursor: pointer;'}

            img {
                width: 60px;
                min-width: 60px;
                object-fit: cover;

                border-radius: 50%;
                padding: 5px;
                overflow: hidden;
                width: 100%;
            }
            box-shadow: ${props => props.theme.colors.shadow} 0px 0px 5px 1px;
        }
        #detailsBalloon {
            margin-top: 15px;
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid ${props => props.theme.colors.primary};
        }
        #balloon {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            padding: 5px;
            border-radius: 5px 5px 5px 5px;
            width: 100%;
            overflow: hidden;

            box-shadow: ${props => props.theme.colors.shadow} 3px 3px 5px 1px;
            background-color: ${props => props.theme.colors.primary};

            .header {
                display: flex;
                flex-wrap: wrap-reverse;
                align-items: center;
                justify-content: space-between;

                #commentItemName {
                    font-weight: bold;
                    opacity: 0.7;
                    ${props => props.type != 'preview' && 'cursor: pointer;'}

                    max-width: 70%;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                #editedInfo {
                    display: flex;
                    align-items: center;
                    margin-left: auto;
                    min-width: 101px;
                    cursor: pointer;
                    ${props => props.type == 'preview' && 'display: none;'}
                    > button {
                        max-height: 15px;
                        padding: 0 4px 0 5px;
                        border-radius: 5px;
                        box-shadow: ${props => props.theme.colors.shadow} 1px
                            1px 1px 1px;
                        background-color: ${props =>
                            props.theme.colors.secondary};

                        cursor: pointer;
                        > p {
                            font-size: 11px;
                            color: ${props => props.theme.colors.textOne};
                            opacity: 0.7;
                        }
                    }
                }

                #btnActions {
                    display: flex;
                    ${props => props.type == 'preview' && 'display: none;'}
                    opacity: 0.7;
                    #icon {
                        transition-duration: 0.3s;
                        margin-left: 5px;
                    }
                }
            }

            #commentMsg {
                opacity: 0.6;
                margin-bottom: 3px;

                ${props =>
                    props.type == 'preview' &&
                    `
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                `}
            }
            #time {
                margin-left: auto;
                font-size: 12px;
            }
        }
    }
    #amount {
        margin-top: 10px;
    }
    #commentsButton {
        margin-top: 20px;
    }
`

export const ReportIcon = styled(Report)`
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition-duration: 0.3s;
    color: ${props => props.theme.colors.textOne};
    :hover {
        color: #f00;
    }
`
export const DeleteForeverIcon = styled(DeleteForever)`
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition-duration: 0.3s;
    color: ${props => props.theme.colors.textOne};
    :hover {
        color: #f00;
    }
`
export const EditIcon = styled(Edit)`
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition-duration: 0.3s;
    color: ${props => props.theme.colors.textOne};
    :hover {
        color: #ff0;
    }
`
