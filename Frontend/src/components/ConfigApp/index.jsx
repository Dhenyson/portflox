import { ContainerConfig } from './styles'
import MenuSelect from '../MenuSelect'
import ButtonOne from '../buttons/buttonOne'
import Support from '../support'

import { useContextValues } from '../../context'

import { useState, useEffect } from 'react'

export default function ConfigApp(props) {
    const [selectTheme, setSelectTheme] = useState('')
    const [supVisivility, setSupVisibility] = useState(0)

    const { setTheme } = useContextValues()

    function handleOnChangeTheme(e) {
        setSelectTheme(e.target.value)
        setTheme(e.target.value)
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage) {
            const response = localStorage.getItem('theme')
            setSelectTheme(response)
        }
    }, [])

    return (
        <ContainerConfig>
            <Support
                type=''
                visibility={supVisivility}
                close={() => setSupVisibility(0)}
            />
            <div className='theme'>
                <p>Theme:&nbsp;</p>
                <MenuSelect
                    options={[
                        { text: 'Default', value: 'defaultTheme' },
                        { text: 'Blue', value: 'blue' },
                        { text: 'Dark', value: 'dark' },
                        { text: 'Light', value: 'light' },
                        { text: 'Light2', value: 'light2' },
                        { text: 'Hot', value: 'hot' }
                        // { text: 'Pink', value: 'pink' }
                    ]}
                    value={selectTheme}
                    onChange={handleOnChangeTheme}
                    // onChange={e => setSelectTheme(e.target.value)}
                />
            </div>

            <div className='buttons'>
                <ButtonOne
                    type={2}
                    text='CLOSE'
                    className='btn'
                    onClick={props.btnClose}
                />
                <ButtonOne
                    text='SUPORT / CONTACT'
                    className='btn'
                    onClick={() => setSupVisibility(1)}
                />
            </div>
        </ContainerConfig>
    )
}
