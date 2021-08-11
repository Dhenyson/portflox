const users = require('../models/userModel')
const portfolios = require('../models/portfolioModel')

async function createUserSlug(name) {
    let slugValided = 0
    let slug = name.replace(/^\s|\s{1,}/g, '-').toLowerCase()
    let count = 0

    const allUsers = await users.find({})

    do {
        let matchingSlugs = allUsers.filter(item => item.slug == slug)

        if (matchingSlugs[0]) {
            let validationNumber = Math.floor(Math.random() * 5000 + 1000)
            slug = `${slug}-${validationNumber}`
            count = count + 1
        } else {
            slugValided = 1
            return slug
        }
    } while (slugValided < 1)
}

async function checkUserSlug(slug, requester) {
    const checkSlug = await users.findOne({ slug })

    if (checkSlug) {
        if (requester.slug !== slug) {
            return {
                status: 'error',
                msg: 'Slug already exists'
            }
        }
    }

    return {
        status: 'success',
        msg: 'success'
    }
}

async function createPortfolioSlug(title) {
    let slugValided = 0
    let slug = title.replace(/^\s|\s{1,}/g, '-').toLowerCase()

    const allportfolios = await portfolios.find({})

    do {
        let matchingSlugs = allportfolios.filter(item => item.slug == slug)

        if (matchingSlugs[0]) {
            let validationNumber = Math.floor(Math.random() * 5000 + 1000)
            slug = `${slug}-${validationNumber}`
        } else {
            slugValided = 1
            return slug
        }
    } while (slugValided < 1)
}

module.exports = { createUserSlug, checkUserSlug, createPortfolioSlug }
