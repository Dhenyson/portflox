import { Wrapper } from './styles'

export default function ButtonOne(props) {
    return (
        <Wrapper
            onClick={props.onClick}
            minWidth={props.minWidth}
            className={props.className}
            type={props.type}
            id={props.id}
        >
            <div className='container'>
                <p>{props.text}</p>
                {props.children}
            </div>
        </Wrapper>
    )
}
