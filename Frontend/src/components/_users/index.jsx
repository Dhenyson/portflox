import { WrapperUsers, ArrowDownUpIcon, ExpandLessIcon } from './styles'
import MenuBar from '../_menuBar'
import UserCard from '../userCard'
import MenuSelect from '../MenuSelect'
import InputWithTags from '../inputWithTags'
import SelectWithTags from '../selectWithTags'
import Head from '../../helpers/head'

import countryList from '../../helpers/countryList'
import selectOptions from '../../helpers/menuSelectOptions'
import filterUsers from '../../utils/filterUsers'
import createListStates from '../../utils/createListStates'
import { useContextValues } from '../../context'

import { useState, useEffect } from 'react'

export default function Users(props) {
    const [users, setUsers] = useState(props.users)
    const [filterMenuVisibility, setFilterMenuVisibility] = useState(0)
    const { filterUsersOptions, filterSearchUserOptions } = selectOptions()

    const [filterNames, setFilterNames] = useState([])
    const [filterKnowledges, setFilterKnowledges] = useState([])
    const [filterCountries, setFilterCountries] = useState([])
    const [filterStates, setFilterStates] = useState([])
    const [filterCities, setFilterCities] = useState([])
    const [sort, setSort] = useState('stars')
    const [selectSearchType, setSelectSearchType] = useState([
        filterSearchUserOptions[0]
    ])

    const { setLoaderBarVisibility } = useContextValues()

    const countries = countryList()

    function toggleFilterMenuVisibility() {
        setFilterMenuVisibility(filterMenuVisibility == 0 ? 1 : 0)
    }

    function reverseList(e) {
        let newList = [...users]
        setUsers(newList.reverse())
    }

    /** Update users list by filters */
    useEffect(() => {
        let options = {
            type: selectSearchType,
            names: filterNames,
            knowledge: filterKnowledges,
            knowledges: filterKnowledges,
            countries: filterCountries,
            states: filterStates,
            cities: filterCities,
            sort: sort
        }
        setUsers(filterUsers(props.users, options))
    }, [
        selectSearchType,
        filterNames,
        filterKnowledges,
        filterCountries,
        filterStates,
        filterCities,
        sort
    ])

    useEffect(() => {
        setFilterNames([])
        setFilterKnowledges([])
    }, [selectSearchType])

    useEffect(() => {
        setLoaderBarVisibility(0)
    }, [])

    return (
        <WrapperUsers filterMenuVisibility={filterMenuVisibility}>
            <Head />

            <MenuBar local='users' button4={toggleFilterMenuVisibility} />
            <div id='filterMenu'>
                <div id='lineOne'>
                    <SelectWithTags
                        id='selectTypeSearch'
                        options={filterSearchUserOptions}
                        objFields={{ text: 'text', value: 'value' }}
                        returnString
                        onChange={v => setSelectSearchType(v[0])}
                        tagStyle={0}
                        placeholder='Search type'
                        noStyle
                        singleTag
                    />
                    {selectSearchType == 'byKnowledge' ? (
                        <InputWithTags
                            className='inputOne'
                            onChange={v => setFilterKnowledges(v)}
                            placeholder='Search by Knowledges'
                        />
                    ) : (
                        <InputWithTags
                            className='inputOne'
                            onChange={v => setFilterNames(v)}
                            placeholder='Search by names'
                        />
                    )}
                </div>

                <div id='lineTwo'>
                    <div id='selects'>
                        <div className='region'>
                            <SelectWithTags
                                id='selectCountry'
                                options={countries}
                                objFields={{ text: 'name' }}
                                returnString
                                onChange={v => setFilterCountries(v)}
                                placeholder='Search by Countries'
                            />
                        </div>

                        <div className='region'>
                            <SelectWithTags
                                id='selectState'
                                options={createListStates(filterCountries)}
                                returnString
                                onChange={v => setFilterStates(v)}
                                // onChange={v => setFilterStates(v)}
                                placeholder='Search by States'
                                off={filterCountries.length <= 0 ? 1 : 0}
                            />
                        </div>
                    </div>

                    <div id='lineThree'>
                        <InputWithTags
                            className='inputCity'
                            onChange={v => setFilterCities(v)}
                            placeholder='Search by cities'
                        />
                        <div id='sortBy'>
                            <MenuSelect
                                id='selectSort'
                                options={filterUsersOptions}
                                onChange={e => setSort(e.target.value)}
                                value={sort}
                            />
                            <div id='arrowDownUp' onClick={reverseList}>
                                <ArrowDownUpIcon />
                            </div>
                        </div>
                    </div>
                </div>

                <ExpandLessIcon onClick={() => setFilterMenuVisibility(0)} />
            </div>

            <ul id='userList' onClick={() => setFilterMenuVisibility(0)}>
                {users.map((user, index) => (
                    <UserCard user={user} key={index} />
                ))}
            </ul>

            {users.length <= 0 && <p id='empty'>No registered users</p>}
        </WrapperUsers>
    )
}
