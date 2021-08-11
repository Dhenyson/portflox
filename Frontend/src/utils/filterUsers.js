export default function filterUser(
    users = [],
    options = {
        type: 'byName',
        names: [],
        knowledge: [],
        countries: [],
        states: [],
        cities: [],
        sort: 'stars'
    }
) {
    let newUsers = [...users]

    newUsers = filterByNames(newUsers, options.names)
    newUsers = filterByKnowledge(newUsers, options.knowledge)
    newUsers = filterByCountries(newUsers, options.countries)
    newUsers = filterByStates(newUsers, options.states)
    newUsers = filterByCities(newUsers, options.cities)
    newUsers = sortUsers(newUsers, options.sort)

    return newUsers
}

function filterByNames(users, names) {
    if (names.length <= 0) {
        return users
    }
    let newUsers = []

    /* O objetivo é adicionar todos usuarios que corresponderem aos nomes da lista.
     * Primeiro faz um map nos nomes da lista, pega o nome atual e faz um map em cada
     * usuario, se esse usuario conter o nome então faz outro map nos usuarios ja
     * adicionados, pois se esse usuario corresponder a outro nome ele não será
     * adicionado duas vezes.
     */
    names.map(name => {
        let currentName = name.toLowerCase().trim()

        users.map(user => {
            let currentUser = user.name.toLowerCase().trim()

            if (currentUser.includes(currentName)) {
                if (newUsers.length > 0) {
                    let alreadyAdded = false
                    for (let i = 0; i < newUsers.length; i++) {
                        if (newUsers[i]._id.toString() == user._id.toString()) {
                            alreadyAdded = true
                        }
                    }
                    if (!alreadyAdded) {
                        newUsers.push(user)
                    }
                } else {
                    newUsers.push(user)
                }
            }
        })
    })

    return newUsers
}
function filterByKnowledge(users, knowledge) {
    if (knowledge.length <= 0) {
        return users
    }
    let newUsers = []

    knowledge.map(KLedge => {
        let currentKnowledge = KLedge.toLowerCase().trim()

        users.map(user => {
            for (let i = 0; i < user.knowledge.length; i++) {
                let cKnowledge = user.knowledge[i].text.toLowerCase().trim()
                if (cKnowledge == currentKnowledge) {
                    let alreadyAdded = false
                    newUsers.map(userAdded => {
                        if (userAdded._id.toString() == user._id.toString()) {
                            alreadyAdded = true
                        }
                    })
                    if (!alreadyAdded) {
                        newUsers.push(user)
                    }
                }
            }
        })
    })

    return newUsers
}
function filterByCountries(users, countries) {
    if (countries.length <= 0) {
        return users
    }

    let newUsers = []

    countries.map(country => {
        let currentCountry = country.toLowerCase().trim()

        users.map(user => {
            let userCountry = user.country.toLowerCase().trim()

            if (userCountry == currentCountry) {
                if (newUsers.length > 0) {
                    let alreadyAdded = false
                    for (let i = 0; i < newUsers.length; i++) {
                        if (newUsers[i]._id.toString() == user._id.toString()) {
                            alreadyAdded = true
                        }
                    }
                    if (!alreadyAdded) {
                        newUsers.push(user)
                    }
                } else {
                    newUsers.push(user)
                }
            }
        })
    })

    return newUsers
}
function filterByStates(users, states) {
    if (states.length <= 0) {
        return users
    }

    let newUsers = []

    states.map(state => {
        let currentState = state.toLowerCase().trim()

        users.map(user => {
            let userState = user.state.toLowerCase().trim()

            if (userState == currentState) {
                if (newUsers.length > 0) {
                    let alreadyAdded = false
                    for (let i = 0; i < newUsers.length; i++) {
                        if (newUsers[i]._id.toString() == user._id.toString()) {
                            alreadyAdded = true
                        }
                    }
                    if (!alreadyAdded) {
                        newUsers.push(user)
                    }
                } else {
                    newUsers.push(user)
                }
            }
        })
    })

    return newUsers
}
function filterByCities(users, cities) {
    if (cities.length <= 0) {
        return users
    }
    let newUsers = []

    cities.map(city => {
        let currentCitie = city.toLowerCase().trim()

        users.map(user => {
            let userCity = user.city.toLowerCase().trim()

            if (userCity.includes(currentCitie)) {
                if (newUsers.length > 0) {
                    let alreadyAdded = false
                    for (let i = 0; i < newUsers.length; i++) {
                        if (newUsers[i]._id.toString() == user._id.toString()) {
                            alreadyAdded = true
                        }
                    }
                    if (!alreadyAdded) {
                        newUsers.push(user)
                    }
                } else {
                    newUsers.push(user)
                }
            }
        })
    })

    return newUsers
}
function sortUsers(users, sort) {
    if (sort === '') {
        return users
    }

    let newUsers = []

    switch (sort) {
        case 'stars':
            newUsers = users.sort((a, b) => {
                const a1 = a.stars.length

                const b1 = b.stars.length

                if (a1 > b1) {
                    return -1
                }

                if (a1 < b1) {
                    return 1
                }

                return 0
            })
            break

        case 'portfolios':
            newUsers = users.sort((a, b) => {
                const a1 = a.portfoliosAmount

                const b1 = b.portfoliosAmount

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

    return newUsers
}
