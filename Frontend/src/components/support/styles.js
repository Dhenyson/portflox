import styled from 'styled-components'

export const WrapperSupport = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    overflow: hidden;

    ${props => props.visibility == 0 && 'display: none;'}

    .background {
        position: absolute;
        z-index: 1;

        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colors.background};
        opacity: 0.9;
    }
`
export const ContainerSupport = styled.div`
    position: relative;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 500px;
    max-height: 640px;

    padding: 20px;
    border-radius: 20px;
    opacity: 1;

    background: ${props => props.theme.colors.primary};
    background: radial-gradient(
        circle,
        ${props => props.theme.colors.primary},
        ${props => props.theme.colors.primary2}
    );

    /* .selectType {
        option {
            max-width: 100%;
            background-color: #f00;
        }
    } */

    > h1 {
        font-size: 16px;
        margin-bottom: 10px;
    }
    > p {
        text-align: center;
    }
    #typeFix {
        width: 100%;
        margin: 5px;
        opacity: 0.6;
    }

    #textContainer {
        position: relative;
        width: 100%;
        border-radius: 20px;

        > textarea {
            width: 100%;
            max-width: 100%;
            min-width: 100%;
            min-height: 80px;

            border: 1px solid ${props => props.theme.colors.tertiary};
            padding: 10px;
            background-color: ${props => props.theme.colors.background};
            color: ${props => props.theme.colors.textOne};
            border-radius: 10px;
        }

        #countChar {
            position: absolute;
            bottom: 5px;
            right: 20px;
            opacity: 0.5;
        }
    }

    #buttons {
        display: flex;
        flex-wrap: wrap;
        #btn {
            margin: 10px 10px 0px 10px;
        }

        @media (max-width: 260px) {
            justify-content: center;
        }
    }
`
