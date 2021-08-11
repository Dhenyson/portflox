import styled from 'styled-components'

export const ContainerDropzonePreviewList = styled.div`
    position: relative;

    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;

    border-radius: 5px;
    background-color: ${props => props.theme.colors.background};

    background-image: url(${props => props.url});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    overflow: hidden;

    #size {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 20px;

        font-size: 14px;
        background-color: #000;
        opacity: 0.7;
    }
`

export const ButtonRemoveImg = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    font-size: 8px;

    opacity: 0.5;

    transition-duration: 0.3s;
    :hover {
        opacity: 1;
    }
    > p {
        position: absolute;
        top: 5px;
        right: 5px;

        display: flex;
        align-items: center;
        justify-content: center;

        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #f00;

        cursor: pointer;
    }
`
