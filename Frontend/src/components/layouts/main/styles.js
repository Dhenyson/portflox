import styled from 'styled-components'

export const GlobalWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};

    ${props => props.noScroll == 1 && 'position: fixed;'}
`
