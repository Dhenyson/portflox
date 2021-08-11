import countries from '../helpers/countryList'
let copyCountries = countries()

export default function createListStates(countryList) {
    let states = []

    if (typeof countryList == 'string') {
        countryList = [countryList]
    }

    countryList.map(country => {
        for (let i = 0; i < copyCountries.length; i++) {
            if (copyCountries[i].name.toLowerCase() == country.toLowerCase()) {
                copyCountries[i].states.map(state => {
                    states.push(state)
                })
            }
        }
    })
    return states.sort()
}
