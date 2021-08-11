import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
*, button, input {

    border: none;
    background: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    scrollbar-width: thin;
    scroll-behavior: smooth;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    ::-webkit-scrollbar {
        display: none;
    }
    font-family: Kdam Thmor, -apple-system, Roboto, BlinkMacSystemFont, Segoe UI, sans-serif;
    letter-spacing: 1px;
    text-shadow: none;
    color: ${props => props.theme.colors.textOne};

}

textarea, input{outline:none}

html, body {
    scroll-behavior: smooth;

    background-color: ${props => props.theme.colors.background};
    color:${props => props.theme.colors.textOne};

}


a {
    color: inherit;
    text-decoration: none;
}

.hidden{
    visibility: hidden;
}

.displayNone{
    display: none;
}

`
