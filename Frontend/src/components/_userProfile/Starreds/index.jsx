import {
    StarredContainer,
    ListSettingsIcon,
    ArrowDownUpIcon,
    ExpandMoreIcon,
    ExpandLessIcon
} from './styles'
import UserCard from '../../userCard'
import CloseButton from '../../buttons/closeButtonIcon'
import SelectWithTags from '../../selectWithTags'
import InputWithTags from '../../inputWithTags'
import MenuSelect from '../../MenuSelect'

import countryList from '../../../helpers/countryList'
import createListStates from '../../../utils/createListStates'
import selectOptions from '../../../helpers/menuSelectOptions'
import filterUsers from '../../../utils/filterUsers'

import { useState, useEffect } from 'react'

export default function Starreds(props) {
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

    const countries = countryList()

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

    return (
        <StarredContainer filterMenuVisibility={filterMenuVisibility}>
            <div className='filter'>
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
                </div>

                {filterMenuVisibility == 1 ? (
                    <div
                        className='expandBtn'
                        onClick={() => setFilterMenuVisibility(0)}
                    >
                        <ExpandLessIcon />
                    </div>
                ) : (
                    <div
                        className='expandBtn'
                        onClick={() => setFilterMenuVisibility(1)}
                    >
                        <ExpandMoreIcon />
                    </div>
                )}
            </div>

            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <UserCard user={user} className='cardStarred' />
                    </li>
                ))}
            </ul>

            <div className='button' onClick={props.closeButton}>
                <CloseButton />
            </div>
        </StarredContainer>
    )
}
