import { Select, CloseIcon, ExpandMoreIcon, ExpandLessIcon } from './styles'
import { useState, useEffect } from 'react'

export default function InputWithTags(props) {
    const [input, setInput] = useState('')
    const [value, setValue] = useState([])
    const [options, setOptions] = useState([])
    const [originalOptions, setOriginalOptions] = useState([])

    const [optionsVisibility, setOptionsVisibility] = useState(0)

    function renderOptions() {
        return options.map((option, index) => (
            <li
                key={index}
                onClick={() => clickSelectOption(index)}
                className={markSelectedTag(index)}
            >
                {option.text}
            </li>
        ))
    }
    function renderTags() {
        return value.map((tag, index) => (
            <li key={index} onClick={() => clickDeleteTag(index)}>
                {tag.text}
                <CloseIcon
                    id='closeIcon'
                    onClick={() => clickDeleteTag(index)}
                    tagStyle={props.tagStyle}
                />
            </li>
        ))
    }
    function markSelectedTag(index) {
        let option = options[index].text.toLowerCase()
        let result = false

        value.map(v => {
            if (v.text.toLowerCase() == option) {
                result = true
            }
        })

        if (result) {
            return 'selected'
        } else {
            return ''
        }
    }

    function clickSelectOption(index) {
        let newValue = [...value]
        let option = options[index].text.toLowerCase()

        let result = false
        value.map(v => {
            if (v.text.toLowerCase() == option) {
                result = true
            }
        })

        if (!result) {
            if (props.singleTag) {
                newValue[0] = options[index]
            } else {
                newValue.push(options[index])
            }
        }

        setValue(newValue)
        setInput('')
    }
    function clickDeleteTag(index) {
        if (!props.disabled && !props.off) {
            let newValue = [...value]
            newValue.splice(index, 1)
            setValue(newValue)
        }
    }

    function handleShowOptions(action) {
        if (!props.disabled && !props.off) {
            if (action != 0 || action != 1) {
                setOptionsVisibility(optionsVisibility == 0 ? 1 : 0)
            } else {
                setOptionsVisibility(action)
            }
        }
    }

    /** Set options */
    useEffect(() => {
        let newOptions = []

        if (typeof props.options == 'string') {
            /** Se é uma string */
            newOptions = [{ text: props.options, value: props.options }]
        } else if (Array.isArray(props.options)) {
            /** Se é um array*/
            props.options.map(option => {
                if (typeof option == 'string') {
                    newOptions.push({ text: option, value: option })
                } else {
                    if (props.objFields) {
                        option.text = option[props.objFields.text]
                        // eslint-disable-next-line no-unused-expressions
                        option.value
                            ? (option.value = option[props.objFields.value])
                            : (option.value = option[props.objFields.text])

                        newOptions.push(option)
                    } else {
                        option.text = option.text
                        // eslint-disable-next-line no-unused-expressions
                        option.value
                            ? (option.value = option.value)
                            : (option.value = option.text)

                        newOptions.push(option)
                    }
                }
            })
        } else {
            /** Se é um objeto */
            if (props.objFields) {
                let copyOptions = props.options
                copyOptions.text = copyOptions[props.objFields.text]
                // eslint-disable-next-line no-unused-expressions
                props.objFields.value
                    ? (copyOptions.value = copyOptions[props.objFields.value])
                    : (copyOptions.value = copyOptions[props.objFields.text])

                newOptions = [copyOptions]
            } else {
                let copyOptions = props.options
                copyOptions.text = copyOptions.text
                // eslint-disable-next-line no-unused-expressions
                props.options
                    ? (copyOptions.value = copyOptions.value)
                    : (copyOptions.value = copyOptions.text)

                newOptions = [copyOptions]
            }
        }

        /** Clear value if no exist in options */
        // value.map((v, index) => {
        //     let cValue = v.text.toLowerCase()
        //     let result = false

        //     options.map(option => {
        //         let cOption = option.text.toLowerCase()

        //         if (cValue == cOption) {
        //             result = true
        //         }
        //     })

        //     if (!result) {
        //         clickDeleteTag(index)
        //     }
        // })

        setOptions(newOptions)
        setOriginalOptions(newOptions)
    }, [props.options])

    /** Filter options by Input */
    useEffect(() => {
        let newOptions = []

        originalOptions.map(option => {
            let cOption = option.text.toLowerCase()

            if (cOption.includes(input.toLowerCase())) {
                newOptions.push(option)
            }
        })

        if (input.length <= 0 && props.options) {
            setOptions(originalOptions)
        } else {
            setOptionsVisibility(1)
        }

        setOptions(newOptions)
    }, [input])

    /** Set initial tag */
    useEffect(() => {
        if (props.initialTag) {
            let newValue = []

            options.map(option => {
                let cOption = option.text.toLowerCase()
                if (cOption == props.initialTag.toLowerCase()) {
                    newValue.push(option)
                } else {
                }
            })

            setValue(newValue)
        }
    }, [props.initialTag])

    /** Return value */
    useEffect(() => {
        let copyValue = [...value]
        let valueReturn = []

        if (props.returnString) {
            copyValue.map(v => {
                valueReturn.push(v.value)
            })
        } else {
            valueReturn = copyValue
        }

        if (props.onChange) {
            props.onChange(valueReturn)
        }
    }, [value])

    /** Clear value if props.off */
    useEffect(() => {
        if (props.off) {
            setValue([])
        }
    }, [props.off])

    return (
        <Select
            showOptions={optionsVisibility == 1 ? 1 : 0}
            singleTag={props.singleTag ? 1 : 0}
            valueLength={value.length}
            tagStyle={props.tagStyle}
            onClick={handleShowOptions}
            disabled={props.disabled ? 1 : 0}
            off={props.off ? 1 : 0}
            className={props.className}
            id={props.id}
        >
            <div>
                <ul className='tagsArea'>{renderTags()}</ul>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    // onFocus={() => setOptionsVisibility(1)}
                    onBlur={() => {
                        setTimeout(() => {
                            setOptionsVisibility(0)
                        }, 100)
                    }}
                    disabled={props.disabled || props.off ? 1 : 0}
                    placeholder={
                        props.placeholder ? props.placeholder : 'Type here'
                    }
                />
            </div>

            {optionsVisibility == 0 ? (
                <ExpandMoreIcon
                    onClick={handleShowOptions}
                    disabled={props.disabled ? 1 : 0}
                    off={props.off ? 1 : 0}
                />
            ) : (
                <ExpandLessIcon
                    onClick={handleShowOptions}
                    disabled={props.disabled ? 1 : 0}
                    off={props.off ? 1 : 0}
                />
            )}

            <div className='options'>
                <ul className='optionsArea'>{renderOptions()}</ul>
            </div>
        </Select>
    )
}
