import styled from 'styled-components'
import { Image } from '../../icons'

export const WrapperDropzone = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;

    border: 3px dashed ${props => props.theme.colors.tertiary};
    border-radius: 5px;
    background-color: ${props => props.theme.colors.secondary};
    cursor: pointer;

    font-size: 14px;
    #text {
        padding: 5px;
        opacity: 0.3;
    }
`

export const ImageIcon = styled(Image)`
    width: 40px;
    height: 40px;
    margin-bottom: -15px;
    opacity: 0.1;
    color: ${props => props.theme.colors.textOne};
`
