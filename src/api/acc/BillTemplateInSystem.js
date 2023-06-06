import request from '@/utils/request'

export function addInTemp(data) {
    return request({
        url: '/client/accounting/bill-voucher-temp/addTemp',
        method: 'post',
        data
    })
}
export function editInSummary(id, summary) {
    return request({
        url: '/client/accounting/bill-voucher-temp/editSummary?id=' + id + '&summary=' + summary,
        method: 'post'
    })
}
export function saveInTempEntries(data) {
    return request({
        url: '/client/accounting/bill-voucher-temp/saveTempEntries',
        method: 'post',
        data
    })
}
export function upIndateTemp(data) {
    return request({
        url: '/client/accounting/bill-voucher-temp/updateTemp',
        method: 'post',
        data
    })
}