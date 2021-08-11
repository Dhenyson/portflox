export default function handleStarred(starredListArg, user) {
    var starredList = starredListArg

    if (starredList.length > 0) {
        var already = false

        for (var i = 0; i < starredList.length; i++) {
            if (starredList[i]._id == user.id) {
                already = true
                starredList.splice(i, 1)
                i = starredList.length
            }
        }

        if (!already) {
            starredList.push({
                _id: user.id,
                name: user.name,
                slug: user.slug,
                city: user.city,
                state: user.state,
                country: user.country,
                profilePicture: user.profilePicture,
                portfolios: user.portfolios,
                stars: user.stars
            })
        }
    } else {
        starredList.push({
            _id: user.id,
            name: user.name,
            slug: user.slug,
            city: user.city,
            state: user.state,
            country: user.country,
            profilePicture: user.profilePicture,
            portfolios: user.portfolios,
            stars: user.stars
        })
    }

    return starredList
}
