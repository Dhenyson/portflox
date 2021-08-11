import styled from 'styled-components'

export const UserImgContainer = styled.div`
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;

    > img {
        max-width: 40px;
        min-width: 40px;
        height: 40px;

        object-fit: cover;
        border-radius: 50%;
        padding: 5px;
        overflow: hidden;
        width: 100%;
    }
`
