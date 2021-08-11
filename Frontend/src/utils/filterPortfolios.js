import handleDates from './handleDates'

export default function filterPortfolio(
    portfolios = [],
    options = {
        tags: [],
        category: '',
        anyTag: true,
        sort: 'updateDate',
        countries: [],
        states: [],
        cities: []
    }
) {
    let newPortfolios = [...portfolios]

    newPortfolios = filterByTags(newPortfolios, options.tags, options.anyTag)
    newPortfolios = filterByCategory(newPortfolios, options.category)
    newPortfolios = filterByCountries(newPortfolios, options.countries)
    newPortfolios = filterByStates(newPortfolios, options.states)
    newPortfolios = filterByCities(newPortfolios, options.cities)
    newPortfolios = sortPortfolios(newPortfolios, options.sort)

    return newPortfolios
}

function filterByTags(portfolios, tags, anyTag) {
    /** Primeiro verifica se o tipo de filtro, se o portfolio precisa ter todas tags
     * ou se precisa ter apenas uma das tags. Depois segue para logica criando um novo
     * array de portfolios para cada uma das logicas.
     */

    /** Encerra a função por aqui, caso não tenha tags */
    if (tags.length <= 0) {
        return portfolios
    }

    /** Encerra a função se tiver apenas uma tag e for vazia */
    if (tags.length == 1 && tags[0] == '') {
        return portfolios
    }

    let newPortfoliosFilter = []

    if (anyTag === true) {
        newPortfoliosFilter = portfolios.filter(portfolio => {
            let result = false
            for (let i = 0; i < portfolio.tags.length; i++) {
                for (let y = 0; y < tags.length; y++) {
                    if (portfolio.tags[i] === tags[y]) {
                        result = true
                    }
                }
            }
            return result
        })
    } else {
        for (let i = 0; i < portfolios.length; i++) {
            let verify = false
            for (let y = 0; y < tags.length; y++) {
                if (portfolios[i].tags.includes(tags[y])) {
                    verify = true
                } else {
                    verify = false
                    y = tags.length
                }
            }
            if (verify) {
                newPortfoliosFilter.push(portfolios[i])
            }
        }
    }
    return newPortfoliosFilter
}
function filterByCategory(portfolios, category) {
    /** Verifica se cada portfolio corresponde a categoria informada */
    let newPortfolios = []
    let availableCategories = [
        'work',
        'service',
        'study',
        'annotation',
        'contribution',
        'blog'
    ]

    /** Se a categoria não corresponse a alguma especifica então retorna a lista original */
    if (!availableCategories.includes(category)) {
        return portfolios
    }

    portfolios.map(item => {
        if (item.category === category) {
            newPortfolios.push(item)
        }
    })

    return newPortfolios
}
function filterByCountries(portfolios, countries) {
    if (!countries || countries.length <= 0) {
        return portfolios
    }

    let newPortfolios = []

    countries.map(country => {
        let currentCountry = country.toLowerCase().trim()

        portfolios.map(portfolio => {
            let authorCountry = portfolio.author.country.toLowerCase().trim()

            if (authorCountry == currentCountry) {
                if (newPortfolios.length > 0) {
                    let alreadyAdded = false
                    for (let i = 0; i < newPortfolios.length; i++) {
                        if (
                            newPortfolios[i]._id.toString() ==
                            portfolio._id.toString()
                        ) {
                            alreadyAdded = true
                        }
                    }
                    if (!alreadyAdded) {
                        newPortfolios.push(portfolio)
                    }
                } else {
                    newPortfolios.push(portfolio)
                }
            }
        })
    })

    return newPortfolios
}
function filterByStates(portfolios, states) {
    if (!states || states.length <= 0) {
        return portfolios
    }
}
function filterByCities(portfolios, cities) {
    if (!cities || cities.length <= 0) {
        return portfolios
    }
    let newPortfolios = []

    cities.map(city => {
        let currentCity = city.toLowerCase().trim()

        portfolios.map(portfolio => {
            let authorCity = portfolio.author.city.toLowerCase().trim()

            if (authorCity.includes(currentCity)) {
                if (newPortfolios.length > 0) {
                    let alreadyAdded = false
                    for (let i = 0; i < newPortfolios.length; i++) {
                        if (
                            newPortfolios[i]._id.toString() ==
                            portfolio._id.toString()
                        ) {
                            alreadyAdded = true
                        }
                    }
                    if (!alreadyAdded) {
                        newPortfolios.push(portfolio)
                    }
                } else {
                    newPortfolios.push(portfolio)
                }
            }
        })
    })

    return newPortfolios
}
function sortPortfolios(portfolios, sort) {
    /** Recebe os portfolios e o tipo de ordenação, faz um switch para cada tipo */
    let newPortfolios = []

    switch (sort) {
        case 'creationDate':
            newPortfolios = portfolios.sort((a, b) => {
                const result1 = handleDates(a.creationDate)
                const a1 = result1.times.ms

                const result2 = handleDates(b.creationDate)
                const b1 = result2.times.ms

                if (a1 < b1) {
                    return -1
                }

                if (a1 > b1) {
                    return 1
                }

                return 0
            })
            break

        case 'updateDate':
            newPortfolios = portfolios.sort((a, b) => {
                const result1 = handleDates(a.updateDate)
                const a1 = result1.times.ms

                const result2 = handleDates(b.updateDate)
                const b1 = result2.times.ms

                if (a1 < b1) {
                    return -1
                }

                if (a1 > b1) {
                    return 1
                }

                return 0
            })
            break

        case 'likes':
            newPortfolios = portfolios.sort((a, b) => {
                const a1 = a.likes.length
                const b1 = b.likes.length

                if (a1 > b1) {
                    return -1
                }

                if (a1 < b1) {
                    return 1
                }

                return 0
            })
            break

        case 'comments':
            newPortfolios = portfolios.sort((a, b) => {
                const a1 = a.commentsAmount
                const b1 = b.commentsAmount

                if (a1 > b1) {
                    return -1
                }

                if (a1 < b1) {
                    return 1
                }

                return 0
            })
            break
    }

    return newPortfolios
}
