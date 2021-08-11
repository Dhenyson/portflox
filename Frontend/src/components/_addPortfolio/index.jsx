import { WrapperAddPortfolio, ContainerAddPortfolio, Length } from './styles'
import MenuBar from '../_menuBar'
import ButtonOne from '../buttons/buttonOne'
import Dropzone from '../dropzone/addImagesPortfolio'
import DropzonePreviewList from '../dropzone/addImagesPortfolio/DropzonePreview'
import { MDtextEditor, MDtextViewer } from '../MDEditor'
import InputWithTags from '../inputWithTags'
import SelectWithTags from '../selectWithTags'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useContextValues } from '../../context'
import hlp from '../../helpers'

import reqPortfolioPost from '../../services/reqPortfolioPost'

export default function AddPortfolio() {
    const standardLength = {
        titleMin: 10,
        titleRec: 50,
        titleMax: 70,

        tagsMin: 1,
        tagsRec: 5,
        tagsMax: 15,

        descriptionMin: 70,
        descriptionRec: 140,
        descriptionMax: 280,

        bodyMin: 200,
        bodyRec: 0,
        bodyMax: 0
    }

    const [category, setCategory] = useState('-- Choose the category')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')

    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')

    const [lengthVisibility, setLengthVisibility] = useState(1)
    const [fieldLength, setFieldLength] = useState('Body')
    const [lengthValue, setLengthValue] = useState(0)
    const [min, setMin] = useState(standardLength.bodyMin)
    const [rec, setRec] = useState(0)
    const [max, setMax] = useState(0)

    const {
        uploadedFiles,
        session,
        showFlashMsg,
        setLoaderBarVisibility,
        authenticated
    } = useContextValues()

    const router = useRouter()

    const categoryOptions = [
        { value: '', text: '-- Choose the category' },
        { value: 'work', text: 'Work' },
        { value: 'service', text: 'Service' },
        { value: 'study', text: 'Study' },
        { value: 'annotation', text: 'Annotation' },
        { value: 'contribution', text: 'Contribution' },
        { value: 'blog', text: 'Blog' }
    ]

    function btnCancel() {
        setLoaderBarVisibility(1)
        router.back()
    }

    function handleFocus(e) {
        setLengthVisibility(1)
        switch (e.target.name) {
            case 'title':
                setFieldLength('Title')
                setLengthValue(title.length)
                setMin(standardLength.titleMin)
                setRec(standardLength.titleRec)
                setMax(standardLength.titleMax)
                break
            case 'tags':
                setFieldLength('Number of tags')
                setLengthValue(tags.length)
                setMin(standardLength.tagsMin)
                setRec(standardLength.tagsRec)
                setMax(standardLength.tagsMax)
                break
            case 'description':
                setFieldLength('Description')
                setLengthValue(description.length)
                setMin(standardLength.descriptionMin)
                setRec(standardLength.descriptionRec)
                setMax(standardLength.descriptionMax)
                break
            default:
                setFieldLength('Body')
                setLengthValue(body.length)
                setMin(standardLength.bodyMin)
                setRec(standardLength.bodyRec)
                setMax(standardLength.bodyMax)
                break
        }
    }
    function handleInputTags(v) {
        if (v.length < tags.length) {
            setTags(v)
        }
        if (tags.length <= 14) {
            setTags(v)
        }
    }
    function handleBlur() {
        // setLengthVisibility(0)
    }
    function handleInputTitle(e) {
        let text = e.target.value
            .replace(/^\s{1,}/g, '')
            .replace(/\s{2,}/g, ' ')
        // .replace(/[^\a-zA-Z\s0-9áàâãéèêíìïóôõÒöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g, '')

        if (text.length < standardLength.titleMax + 1) {
            setTitle(text)
            setLengthValue(text.length)
        }
    }
    function handleInputDescription(e) {
        if (e.target.value.length < standardLength.descriptionMax + 1) {
            setDescription(e.target.value)
            setLengthValue(e.target.value.length)
        }
    }

    async function postButtonClickAction() {
        setLoaderBarVisibility(1)
        const response = await reqPortfolioPost(
            session.accessToken,
            category,
            title,
            tags,
            description,
            uploadedFiles,
            body
        )
        setLoaderBarVisibility(0)

        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)
        }
        if (response.status == 'success') {
            router.push(`/p/${response.slug}`)
        }
    }
    /** Redirect to home if not autheticated */
    useEffect(() => {
        if (!authenticated) {
            router.push('/')
        }
    })

    /** Update field length by default body */
    useEffect(() => {
        setFieldLength('Body')
        setLengthValue(body.length)
        setMin(standardLength.bodyMin)
        setRec(standardLength.bodyRec)
        setMax(standardLength.bodyMax)
    }, [body])

    /** set length value by input tags */
    useEffect(() => {
        setLengthValue(tags.length)
    }, [tags])

    /** Disabled loader when page is ready */
    useEffect(() => {
        setLoaderBarVisibility(0)
    }, [])

    return (
        <WrapperAddPortfolio>
            <title>{hlp.APP_NAME}</title>
            <MenuBar />

            <ContainerAddPortfolio>
                <div className='menu'>
                    <ButtonOne
                        type={2}
                        text='Cancel'
                        className='button'
                        onClick={btnCancel}
                        minWidth='80px'
                    />
                    <Length visibility={lengthVisibility}>
                        <p id='field'>
                            {fieldLength}: {lengthValue}
                        </p>
                        <div id='lengths'>
                            <div>
                                <p>Min</p>
                                <p>{min}</p>
                            </div>
                            <div>
                                <p>Rec</p>
                                <p>{rec}</p>
                            </div>
                            <div>
                                <p>Max</p>
                                <p>{max}</p>
                            </div>
                        </div>
                    </Length>
                    <ButtonOne
                        text='Post'
                        className='button'
                        onClick={postButtonClickAction}
                        minWidth='80px'
                    />
                </div>

                <div className='headerInfos'>
                    <section className='left'>
                        <div id='menuSelect'>
                            <label id='labelCategory'>Category:</label>
                            <SelectWithTags
                                options={categoryOptions}
                                typeObj={{ text: 'text', value: 'value' }}
                                returnObj={false}
                                onChange={v => setCategory(v[0])}
                                returnString
                                className='select'
                                tagStyle={0}
                                singleTag
                            />
                        </div>
                        <div id='title'>
                            {/* <div id='length'>
                                Length: {title.length} Min: 10 Rec: 50 Max: 80
                                ad asdfasd |
                            </div> */}
                            <label>Title</label>
                            <input
                                type='text'
                                value={title}
                                onChange={handleInputTitle}
                                placeholder='Type here...'
                                name='title'
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className='inputAddPortfolio'
                            />
                        </div>
                        <div id='tags'>
                            <label>Tags</label>

                            <InputWithTags
                                id='inputTags'
                                onChange={handleInputTags}
                                name='tags'
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                limitTags={15}
                            />
                        </div>
                    </section>

                    <section className='right'>
                        <div id='description'>
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={handleInputDescription}
                                placeholder='Type here...'
                                name='description'
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                className='inputAddPortfolio'
                                style={{ height: '115px' }}
                            />
                        </div>
                    </section>
                </div>

                <main>
                    <div className='addImages'>
                        <div id='area'>
                            <Dropzone id='dropZoneItem' />
                            {uploadedFiles.slice(0, 5).map((img, index) => (
                                <DropzonePreviewList
                                    id='dropZoneItem'
                                    img={img}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </div>
                        <p style={{ opacity: '0.5' }}>
                            Maximum size 2mb per image
                        </p>
                    </div>

                    <div id='mdEditorArea'>
                        <MDtextEditor
                            value={body}
                            name='body'
                            onChange={setBody}
                            className='mdEditor'
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>

                    <div id='preview'>
                        <MDtextViewer
                            value={body}
                            name='body'
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                </main>
            </ContainerAddPortfolio>
        </WrapperAddPortfolio>
    )
}
