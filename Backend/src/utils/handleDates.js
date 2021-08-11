function dateDiff(firstDate, secondDate = Date.now()) {
    /** Init validarion */
    if (
        new Date(firstDate) == 'Invalid Date' ||
        new Date(secondDate) == 'Invalid Date'
    ) {
        return { status: 'error', message: 'Invalid Date' }
    }

    var a = new Date(firstDate)
    var b = new Date(secondDate)

    const utc1 = Date.UTC(
        a.getFullYear(),
        a.getMonth(),
        a.getDate(),
        a.getHours(),
        a.getMinutes(),
        a.getSeconds(),
        a.getMilliseconds()
    )
    const utc2 = Date.UTC(
        b.getFullYear(),
        b.getMonth(),
        b.getDate(),
        b.getHours(),
        b.getMinutes(),
        b.getSeconds(),
        b.getMilliseconds()
    )

    /** Get the difference in milliseconds*/
    var msDiff = Math.floor(utc1 - utc2)
    var milliseconds, seconds, minutes, hours, dayss, weeks, months, years

    var diffs = [
        (milliseconds = { time: 'ms', value: msDiff }),
        (seconds = {
            time: 'sec' /** segundo */,
            value: Math.trunc(msDiff / 1000)
        }),
        (minutes = {
            time: 'min' /** minuto */,
            value: Math.trunc(msDiff / (1000 * 60))
        }),
        (hours = {
            time: 'hour' /** hora */,
            value: Math.trunc(msDiff / (1000 * 60 * 60))
        }),
        (days = {
            time: 'day' /** dia */,
            value: Math.trunc(msDiff / (1000 * 60 * 60 * 24))
        }),
        (weeks = {
            time: 'week' /** semana */,
            value: Math.trunc(msDiff / (1000 * 60 * 60 * 24 * 7))
        }),
        (months = {
            time: 'month' /** mês */,
            value: Math.trunc(msDiff / (1000 * 60 * 60 * 24 * 7 * 4))
        }),
        (years = {
            time: 'year' /** ano */,
            value: Math.trunc(
                Math.abs(Math.trunc(msDiff / (1000 * 60 * 60 * 24))) / 365
            )
        })
    ]

    /** Return ariables */
    var diff = '' // [String] For example: '3 hours' or '40 min'
    var times = {} // [Object] For example: times.week (return [number] 3)

    diffs.map((item, index) => {
        const value = Math.abs(item.value)
        times[item.time] = value

        //If hour, day, week, month and year > 1, then increment 's'
        if (value >= 1) {
            if (index >= 3 && value > 1) {
                diff = `${value} ${item.time}s`
            } else {
                diff = `${value} ${item.time}`
            }
        }
    })

    if (diff.length < 1) {
        diff = 'now'
    }

    return { status: 'success', message: 'success', diff, times }
}

function limitAge(date, ageMax = 130, ageMin = 0) {
    const { times } = dateDiff(date)

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    const dateReceived = new Date(date)
    const yearReceived = dateReceived.getFullYear()

    if (yearReceived >= currentYear) {
        return false
    }

    const year = times.year

    if (year > ageMax || year < ageMin) {
        return false
    } else {
        return true
    }
}

function cleanDate(date) {
    /** Init validation */
    if (new Date(date) === 'Invalid Date') {
        return { status: 'error', msg: 'Invalid Date' }
    }

    let a = new Date(date).toLocaleDateString('en-US', {
        timeZone: 'America/New_York'
    })

    let b = a.split('/')
    let dayNumber = parseInt(b[1], 10) + 1

    let year = b[2]
    let month = b[0].length === 1 ? '0' + b[0] : b[0]
    let day = dayNumber.length === 1 ? '0' + dayNumber : dayNumber

    let c = day + '/' + month + '/' + year

    return { status: 'success', date: c }
}

module.exports = { limitAge, cleanDate }
