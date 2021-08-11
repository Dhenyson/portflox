import styled from 'styled-components'

export const ContainerConfig = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;

    .theme {
        min-height: 35px;
        display: flex;
        align-items: center;
    }

    .buttons {
        display: flex;
        flex-wrap: wrap;

        .btn {
            margin: 15px 5px 5px 5px;
        }
    }

    .selectType {
        width: 100%;
        margin-bottom: 5px;
    }
`
