import request from '@/utils/request'
// 新增凭证模板
export function addInTemp(data) {
    return request({
        url: '/client/accounting/bill-voucher-temp/addTemp',
        method: 'post',
        data
    })
}
// 修改摘要
export function editInSummary(id, summary) {
    return request({
        url: '/client/accounting/bill-voucher-temp/editSummary?id=' + id + '&summary=' + summary,
        method: 'post'
    })
}
// 票据凭证分录修改保存
export function saveInTempEntries(data) {
    return request({
        url: '/client/accounting/bill-voucher-temp/saveTempEntries',
        method: 'post',
        data
    })
}
// 修改
export function upIndateTemp(data) {
    return request({
        url: '/client/accounting/bill-voucher-temp/updateTemp',
        method: 'post',
        data
    })
}