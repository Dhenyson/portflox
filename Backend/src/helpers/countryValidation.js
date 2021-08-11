function countryValidation(country) {
    const validContries = [
        'Brazil',
        'Estados Unidos',
        'China',
        'Japão',
        'Canada'
    ]

    if (validContries.includes(country)) {
        return true
    } else {
        return false
    }
}

module.exports = countryValidation
