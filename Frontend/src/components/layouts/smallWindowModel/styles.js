import styled from 'styled-components'

export const ContainerSmallWindow = styled.div`
    position: absolute;
    z-index: 5;
    bottom: 180px;

    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 90%;
    max-width: 420px;

    height: 420px;
    min-height: 300px;
    max-height: 420px;

    padding: 30px 20px 10px 20px;

    border-radius: 20px;
    background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    );

    transition-duration: 0.3s;

    @media (max-height: 640px) {
        position: fixed;
        top: 0;
        height: 100%;
        padding: 10px;
        width: 100%;
    }

    ::after {
        content: '';
        position: absolute;
        bottom: -90px;
        z-index: 0;

        width: 0;
        height: 0;

        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-top-width: 91px;
        border-top-style: solid;
        border-top-color: ${props => props.theme.colors.primary2};
        filter: brightness(105%);

        @media (max-height: 580px) {
            display: none;
        }
    }
`
