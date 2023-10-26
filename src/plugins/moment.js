import moment from 'moment-jalaali'
import 'moment/locale/fa.js'

moment.loadPersian({ dialect: 'persian-modern' })

// Function to check if a date is today
moment.fn.isDateToday=date => {
  // Get today's date
  const today = moment().startOf('day')

  // Parse the given date string
  const givenDate = moment(date).startOf('day')

  // Check if the parsed given date is equal to today's date
  return today.isSame(givenDate)
}

moment.fn.getWeekArray = date => {
  function addWeek(weekArray, week) {
    let emptyDays = 7 - week.length

    for (let i = 0; i < emptyDays; ++i) {
      if (weekArray.length) {
        // push
        let last = week[week.length - 1]
        week.push(getDay(last.date.clone().add(1, 'day'), false))
      } else {
        // unshift
        let day = getDay(week[0].date.clone().subtract(1, 'day'), false)
        week.unshift(day)
      }
    }

    weekArray.push(week)
  }

  function getDay(day, isInMonth = true) {
    return {
      isInMonth,
      date: day.clone(),
      formatted: day.format('YYYY-MM-DD'),
    }
  }

  date.set({ h: 12, m: 0 })

  let daysInMonth = moment.jDaysInMonth(date.jYear(), date.jMonth())
  let day = date.clone().jDate(1)
  let dayArray = [getDay(day)]

  for (let i = 2; i <= daysInMonth; i++) {
    dayArray.push(getDay(day.add(1, 'day')))
  }

  let weekArray = []
  let week = []

  dayArray.forEach(day => {
    if (week.length > 0 && day.date.day() === 6) {
      addWeek(weekArray, week)
      week = []
    }

    week.push(day)
    if (dayArray.indexOf(day) === dayArray.length - 1) {
      addWeek(weekArray, week)
    }
  })

  return weekArray
}

moment.duration.fn.format = function(input = 'HH:mm') {
  let output = input
  let milliseconds = this.asMilliseconds()
  let totalMilliseconds = 0
  let replaceRegexps = {
    years: /Y(?!Y)/g,
    months: /M(?!M)/g,
    weeks: /W(?!W)/g,
    days: /D(?!D)/g,
    hours: /H(?!H)/g,
    minutes: /m(?!m)/g,
    seconds: /s(?!s)/g,
    milliseconds: /S(?!S)/g,
  }
  let matchRegexps = {
    years: /Y/g,
    months: /M/g,
    weeks: /W/g,
    days: /D/g,
    hours: /H/g,
    minutes: /m/g,
    seconds: /s/g,
    milliseconds: /S/g,
  }
  for (let r in replaceRegexps) {
    if (replaceRegexps[r].test(output)) {
      let as = 'as' + r.charAt(0).toUpperCase() + r.slice(1)
      let value = String(
        Math.floor(moment.duration(milliseconds - totalMilliseconds)[as]()),
      )
      let replacements = output.match(matchRegexps[r]).length - value.length
      output = output.replace(replaceRegexps[r], value)

      while (replacements > 0 && replaceRegexps[r].test(output)) {
        output = output.replace(replaceRegexps[r], '0')
        replacements--
      }
      output = output.replace(matchRegexps[r], '')

      let temp = {}
      temp[r] = value
      totalMilliseconds += moment.duration(temp).asMilliseconds()
    }
  }

  return output
}

export default {
  install: app => {
    // inject a globally available $moment method
    app.config.globalProperties.$moment = moment
  },
}
export const $moment = moment
