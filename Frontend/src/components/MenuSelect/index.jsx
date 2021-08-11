import { ContainerMenuSelect } from './styles'

export default function MenuSelect(props) {
    return (
        <ContainerMenuSelect className={props.className} id={props.id}>
            <select
                value={props.value}
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
            >
                {props.options.map((item, index) => (
                    <option value={item.value} key={index}>
                        {item.text}
                    </option>
                ))}
            </select>
        </ContainerMenuSelect>
    )
}
