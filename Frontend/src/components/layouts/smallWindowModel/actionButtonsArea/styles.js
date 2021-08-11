import styled from 'styled-components'

export const ActionButtonsArea = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 270px) {
        justify-content: center;
    }

    width: 100%;
    max-width: 300px;
    height: 50px;
    max-height: 80px;

    /* align-self: flex-end; */
    /* justify-self: end; */
    /* justify-self: flex-end; */
    /* justify-self: self-end; */
    /* align-content: flex-end; */

    padding-bottom: 10px;
`
