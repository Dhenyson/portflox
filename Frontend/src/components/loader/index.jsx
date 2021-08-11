import { ContainerLoading } from './styles'
import { useContextValues } from '../../context'

export default function Loading(props) {
    const { loaderBarVisibility } = useContextValues()
    return (
        <ContainerLoading
            visibility={(props.visibility || loaderBarVisibility) == 1 ? 1 : 0}
        >
            <div className='bar' />
        </ContainerLoading>
    )
}
