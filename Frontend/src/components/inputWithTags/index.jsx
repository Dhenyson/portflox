import { Input, CloseIcon } from './styles'
import { useState, useEffect } from 'react'

export default function InputWithTags(props) {
    const [input, setInput] = useState('')
    const [tags, setTags] = useState([])
    const [confirmDeleteTag, setConfirmDeleteTag] = useState([])

    function handleKeyPress(e) {
        /** add new tag with "enter key" */
        if (e.keyCode === 13 && input.trim().length >= 1) {
            if (
                !tags.includes(input.trim().toLowerCase()) &&
                !tags.includes(input.trim().toUpperCase()) &&
                !tags.includes(input.trim())
            ) {
                let newTags = [...tags]
                newTags.push(input.trim())
                setTags(newTags)
                setInput('')
            }
        }
        /** Delete last tag "with backspace" or "delete key" */
        if (e.keyCode === 8 && input.length === 0) {
            if (confirmDeleteTag === 1) {
                let newTags = [...tags]
                newTags.pop()
                setTags(newTags)
                setInput('')
                setConfirmDeleteTag(0)
            } else {
                setConfirmDeleteTag(1)
            }
        }
    }

    function deleteTag(index) {
        let newTags = [...tags]
        newTags.splice(index, 1)
        setTags(newTags)
    }

    /** Set initial tags */
    useEffect(() => {
        if (props.initialTags && props.initialTags.length >= 1) {
            setTags(props.initialTags)
        } else {
            setTags([])
        }
    }, [])

    /** Return value by onChange */
    useEffect(() => {
        if (props.onChange) {
            props.onChange(tags)
        }
    }, [tags])

    return (
        <Input
            className={props.className}
            id={props.id}
            style={props.style}
            hiddenInput={props.hiddenInput}
            limitTags={tags.length === props.limitTags ? 0 : 1}
        >
            <ul>
                {tags.map((tag, index) => (
                    <li key={index} onClick={() => deleteTag(index)}>
                        {tag}{' '}
                        <CloseIcon
                            id='closeIcon'
                            onClick={() => deleteTag(index)}
                        />
                    </li>
                ))}
            </ul>

            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder={
                    props.placeholder
                        ? props.placeholder
                        : 'Type and press "enter"'
                }
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                name={props.name}
                disabled={props.disabled}
            />
        </Input>
    )
}
