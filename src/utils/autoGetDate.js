export const autoGetDate = function (str) {
    // 获取一个yyyy-mm
    let year = str && str.split('-')[0]
    let month = str && str.split('-')[1]
    // 获取月初月末的日期
    let startDate = new Date(year, month, 1).getDate()
    let endDate = new Date(year, month, 0).getDate()

    startDate = startDate > 9 ? startDate : "0" + startDate
    // 拼接
    let yc = `${str}-${startDate}`
    let ym = `${str}-${endDate}`
    let arr = [yc, ym]
    return arr
}
export const getToday = function () {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    const day = `${y}-${m > 10 ? m : '0' + m}-${d > 10 ? d : '0' + d}`
    return day
}
export const getWeek = function () {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()

    const lastweek = new Date(date.setDate(d - 7))
    const yy = date.getFullYear()
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    return [`${yy}-${mm > 10 ? mm : '0' + mm}-${dd > 10 ? dd : '0' + dd}`, `${y}-${m > 10 ? m : '0' + m}-${d > 10 ? d : '0' + d}`]
}
export const getMonth = function () {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    let startDate = new Date(y, m, 1).getDate()
    let endDate = new Date(y, m, 0).getDate()

    startDate = startDate > 9 ? startDate : "0" + startDate
    // 拼接
    let yc = `${y}-${m > 10 ? m : '0' + m}-${startDate}`
    let ym = `${y}-${m > 10 ? m : '0' + m}-${endDate}`
    let arr = [yc, ym]
    return arr
}