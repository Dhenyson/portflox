export default function createListCountries(countries) {
    let newCountries = countries.reduce((acc, item) => {
        acc.push({ value: item.name, label: item.name, states: item.states })
        return acc
    }, [])
    return newCountries
}
