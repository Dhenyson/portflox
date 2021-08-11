import handleDates from './handleDates'

export default function handleOrderPortfolio() {
    function creationOldestToNewest(portfolios) {
        const newPortfolio = portfolios.sort((a, b) => {
            const result1 = handleDates(a.updateDate)
            const a1 = result1.times.ms

            const result2 = handleDates(b.updateDate)
            const b1 = result2.times.ms

            if (a1 > b1) {
                return -1
            }

            if (a1 < b1) {
                return 1
            }

            return 0
        })
        return newPortfolio
    }

    function creationNewestToOldest(portfolios) {
        const newPortfolio = portfolios.sort((a, b) => {
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
        return newPortfolio
    }

    function updateNewestToOldest(portfolios) {
        const newPortfolio = portfolios.sort((a, b) => {
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
        return newPortfolio
    }

    function updateOldestToNewest(portfolios) {
        const newPortfolio = portfolios.sort((a, b) => {
            const result1 = handleDates(a.updateDate)
            const a1 = result1.times.ms

            const result2 = handleDates(b.updateDate)
            const b1 = result2.times.ms

            if (a1 > b1) {
                return -1
            }

            if (a1 < b1) {
                return 1
            }

            return 0
        })
        return newPortfolio
    }

    function moreLikes(portfolios) {
        const newPortfolio = portfolios.sort((a, b) => {
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
        return newPortfolio
    }

    function moreComments(portfolios) {
        const newPortfolio = portfolios.sort((a, b) => {
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
        return newPortfolio
    }

    return {
        creationOldestToNewest,
        creationNewestToOldest,
        updateNewestToOldest,
        updateOldestToNewest,
        moreLikes,
        moreComments
    }
}
