import {
    WrapperMain,
    EmptyFeed,
    ArrowDownUpIcon,
    ExpandLessIcon
} from './styles'
import Portfolios from '../portfolioCard'
import MenuSelect from '../MenuSelect'
import MenuBar from '../_menuBar'
import InputWithTags from '../inputWithTags'
import SelectWithTags from '../selectWithTags'
import Head from '../../helpers/head'

import menuSelectOptions from '../../helpers/menuSelectOptions'
import filterPortfolios from '../../utils/filterPortfolios'
import hlp from '../../helpers'
import { useContextValues } from '../../context'
import countryList from '../../helpers/countryList'
import createListStates from '../../utils/createListStates'

import { useState, useEffect } from 'react'

export default function MainArea(props) {
    const [portfolios, setPortfolios] = useState(props.portfolios)
    const [filterMenuVisibility, setFilterMenuVisibility] = useState(0)
    const [inputTags, setInputTags] = useState('')

    const [tags, setTags] = useState([])
    const [category, setCategory] = useState('All categories')
    const [anyTag, setAnytag] = useState(true)
    const [sort, setSort] = useState('updateDate')
    const [countries, setCountries] = useState([])
    const [statesAddress, setStatesAddress] = useState([])
    const [cities, setCities] = useState([])

    const { categoryOptions, tagsOptions, orderByOption } = menuSelectOptions()
    const { setLoaderBarVisibility } = useContextValues()

    const countriesL = countryList()

    function toggleFilterMenuVisibility() {
        setFilterMenuVisibility(filterMenuVisibility == 0 ? 1 : 0)
    }
    function handleCategory(e) {
        setCategory(e.target.value)
    }
    function handleAnyTag(e) {
        if (e.target.value == 'any') {
            setAnytag(true)
        } else {
            setAnytag(false)
        }
    }
    function handleSort(e) {
        setSort(e.target.value)
    }
    function reverseList() {
        let newList = [...portfolios]
        setPortfolios(newList.reverse())
    }

    /** Activate filter */
    useEffect(() => {
        let options = {
            tags: tags,
            category: category,
            anyTag: anyTag,
            sort: sort,
            countries: countries,
            states: statesAddress,
            cities: cities
        }
        setPortfolios(filterPortfolios(props.portfolios, options))
    }, [category, anyTag, sort, tags, countries, statesAddress, cities])

    /** Clear filters */
    useEffect(() => {
        if (inputTags.length <= 0) {
            setTags([])
        }
    }, [inputTags])

    useEffect(() => {
        setLoaderBarVisibility(0)
    }, [])

    return (
        <WrapperMain filterMenuVisibility={filterMenuVisibility}>
            <title>{hlp.APP_NAME}</title>
            <Head
                url={hlp.FRONTEND_HOST}
                title={hlp.APP_NAME}
                description={hlp.APP_DESCRIPTION}
                image={'https://www.portflox.com/images/banner.jpg'}
            />

            <MenuBar local='main' button4={toggleFilterMenuVisibility} />

            <div id='filterMenu'>
                <div className='lineOne'>
                    <InputWithTags
                        className='input inputTag itemFilter'
                        onChange={v => setTags(v)}
                        placeholder='Type Tags (press "enter")'
                    />
                </div>

                <div className='lineTwo'>
                    <MenuSelect
                        className='itemFilter'
                        id='select'
                        options={categoryOptions}
                        onChange={handleCategory}
                    />
                    <MenuSelect
                        className='itemFilter'
                        id='select'
                        options={tagsOptions}
                        onChange={handleAnyTag}
                    />
                </div>

                <p className='label'>Search by location</p>

                <div className='lineThree'>
                    <SelectWithTags
                        className='itemFilter'
                        id='selectCountry'
                        options={countriesL}
                        objFields={{ text: 'name' }}
                        returnString
                        onChange={v => setCountries(v)}
                        placeholder='Countries'
                    />

                    <SelectWithTags
                        className='itemFilter'
                        id='selectState'
                        options={createListStates(countries)}
                        returnString
                        onChange={v => setStatesAddress(v)}
                        placeholder='States'
                        off={countries.length <= 0 ? 1 : 0}
                    />

                    <InputWithTags
                        className='itemFilter input'
                        id='inputCity'
                        onChange={v => setCities(v)}
                        placeholder='Cities'
                    />
                </div>

                <p className='label'>Sort</p>

                <div className='lineFour'>
                    <div className='sortBy'>
                        <MenuSelect
                            className='sortSelect itemFilter'
                            options={orderByOption}
                            onChange={handleSort}
                        />
                        <div
                            className='arrowDownUp itemFilter'
                            onClick={reverseList}
                        >
                            <ArrowDownUpIcon />
                        </div>
                    </div>
                </div>

                <ExpandLessIcon onClick={() => setFilterMenuVisibility(0)} />
            </div>

            {portfolios[0] ? (
                <>
                    <div
                        className='portfoliosContainerMain'
                        onClick={() => setFilterMenuVisibility(0)}
                    >
                        {portfolios.map((item, index) => (
                            <Portfolios portfolio={item} key={index} />
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div
                        className='emptyFeed'
                        onClick={() => setFilterMenuVisibility(0)}
                    >
                        <EmptyFeed />
                        <p> For now it's empty </p>
                    </div>
                </>
            )}
        </WrapperMain>
    )
}
