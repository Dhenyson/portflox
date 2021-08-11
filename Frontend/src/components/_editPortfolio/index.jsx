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

import reqPortfolioEdit from '../../services/reqPortfolioEdit'
import hlp from '../../helpers'

export default function EditPortfolio() {
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
    const {
        uploadedFiles,
        session,
        showFlashMsg,
        setLoaderBarVisibility,
        setUploadedFiles
    } = useContextValues()
    const router = useRouter()

    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([])

    const [initialTags, setInitialTags] = useState([])
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')

    const [lengthVisibility, setLengthVisibility] = useState(0)
    const [fieldLength, setFieldLength] = useState('Body')
    const [lengthValue, setLengthValue] = useState(0)
    const [min, setMin] = useState(standardLength.bodyMin)
    const [rec, setRec] = useState(0)
    const [max, setMax] = useState(0)

    const categoryOptions = [
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

    async function btnSave() {
        setLoaderBarVisibility(1)
        const portfolioID = router.query.portfolioID

        const response = await reqPortfolioEdit(
            session.accessToken,
            category,
            title,
            tags,
            description,
            uploadedFiles,
            body,
            portfolioID
        )
        setLoaderBarVisibility(0)

        if (response.status) {
            showFlashMsg(response.status, 5, response.msg)
        }
        if (response.status == 'success') {
            router.push(`/p/${response.slug}`)
        }
    }
    async function saveImgUploaded(imgArray) {
        setLoaderBarVisibility(1)
        let response = {}
        let imgList = []

        if (imgArray.length >= 1) {
            if (imgArray.length == 1) {
                response = await fetch(imgArray)

                if (response.status === 200) {
                    let blob = await response.blob()
                    blob.lastModified = Date.now()
                    blob.lastModifiedDate = new Date()
                    blob.name = `${'img'}.${blob.type.split('/')[1]}`
                    blob.path = `${'img'}.${blob.type.split('/')[1]}`
                    blob.webkitRelativePath = ''

                    let file = {
                        file: blob,
                        preview: URL.createObjectURL(blob)
                    }
                    imgList.push(file)
                }
            } else {
                response = await Promise.all(imgArray)
                for (var i = 0; i < response.length; i++) {
                    if (response[i].status === 200) {
                        let blob = await response[i].blob()
                        blob.lastModified = Date.now()
                        blob.lastModifiedDate = new Date()
                        blob.name = `${i}.${blob.type.split('/')[1]}`
                        blob.path = `${i}.${blob.type.split('/')[1]}`
                        blob.webkitRelativePath = ''

                        let file = {
                            file: blob,
                            preview: URL.createObjectURL(blob)
                        }
                        imgList.push(file)
                    }
                }
            }
        }

        setUploadedFiles(imgList)
        setLoaderBarVisibility(0)
    }

    /** Update length tags */
    useEffect(() => {
        setLengthValue(tags.length)
    }, [tags])

    /** Update field length by default body */
    useEffect(() => {
        setFieldLength('Body')
        setLengthValue(body.length)
        setMin(standardLength.bodyMin)
        setRec(standardLength.bodyRec)
        setMax(standardLength.bodyMax)
    }, [body])

    /** Update fildes with query.params */
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage) {
            let portfolio = router.query
            let imgURL = []

            if (portfolio.images) {
                if (typeof portfolio.images == 'string') {
                    imgURL.push([
                        `${hlp.BACKEND_HOST}/images/portfolioImages/${portfolio.images}`
                    ])
                } else {
                    imgURL = portfolio.images.reduce((acc, imgItem) => {
                        acc.push(
                            fetch(
                                `${hlp.BACKEND_HOST}/images/portfolioImages/${imgItem}`
                            )
                        )
                        return acc
                    }, [])
                }
            }
            saveImgUploaded(imgURL)

            setCategory(portfolio.category ? portfolio.category : '')
            setTitle(portfolio.title ? portfolio.title : '')
            setDescription(portfolio.description ? portfolio.description : '')
            setBody(portfolio.body ? portfolio.body : '')

            let newTags = () => {
                if (portfolio.tags) {
                    if (typeof portfolio.tags == 'string') {
                        return [portfolio.tags]
                    } else {
                        return portfolio.tags
                    }
                } else {
                    return []
                }
            }
            setTags(newTags)
            setInitialTags(newTags)
        }
    }, [router.query])

    return (
        <WrapperAddPortfolio>
            <title>{hlp.APP_NAME}</title>
            <MenuBar />

            <ContainerAddPortfolio>
                <div className='menu'>
                    <ButtonOne
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
                        text='Save'
                        className='button'
                        onClick={btnSave}
                        minWidth='80px'
                    />
                </div>

                <div className='headerInfos'>
                    <section className='left'>
                        <div id='menuSelect'>
                            <label id='labelCategory'>Category</label>
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

                            {initialTags.length >= 1 && (
                                <InputWithTags
                                    id='inputTags'
                                    onChange={handleInputTags}
                                    name='tags'
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    initialTags={initialTags}
                                    limitTags={15}
                                />
                            )}
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
