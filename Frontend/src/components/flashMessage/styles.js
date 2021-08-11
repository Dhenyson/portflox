import styled from 'styled-components'

export const Wrapper = styled.div`
    position: fixed;
    top: 0;
    z-index: 100;

    width: 100%;
    height: 50px;
    text-align: center;

    cursor: pointer;

    @media (min-width: 640px) {
        width: 420px;
        top: 10px;
    }

    .tip {
        opacity: 0.5;
        font-size: 10px;
        margin-bottom: -5px;
    }

    .progress-bar-container {
        height: 5px;
        background-color: #555;

        .progress-bar {
            transition-duration: 5s;
            height: 100%;
            background-color: ${props => props.theme.colors.backgroundInverted};
            filter: brightness(150%);
        }
    }

    .error {
        background-color: ${props => props.theme.colors.unauthenticated};
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    background-color: ${props => props.theme.colors.authenticated};

    @media (min-width: 640px) {
        border-radius: 10px 10px 0px 0px;
    }

    > p {
        font-size: 18px;
        color: #fff;
    }
`
