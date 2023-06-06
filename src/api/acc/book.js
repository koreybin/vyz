import request from '@/utils/request'
export function getTree(data) {
    return request({
        url: '/client/client/data/tree',
        method: 'post',
        data
    })
}
export function detailedBooks(assistId, data, subjectId) {
    return request({
        url: '/client/client/data/detailedBooks?assistId=' + assistId + '&subjectId=' + subjectId,
        method: 'post',
        data
    })
}
export function generalLedger(data) {
    return request({
        url: '/client/client/data/generalLedger',
        method: 'post',
        data
    })
}
export function voucherSummary(data) {
    return request({
        url: '/client/client/data/voucherSummary',
        method: 'post',
        data
    })
}
export function subjectBalance(data) {
    return request({
        url: '/client/client/data/subjectBalance',
        method: 'post',
        data
    })
}
export function quantityAmountDetailsTree(data) {
    return request({
        url: '/client/client/data/quantityAmountDetailsTree',
        method: 'post',
        data
    })
}
export function quantityAmountDetails(assistId, data, subjectId) {
    return request({
        url: '/client/client/data/quantityAmountDetails?assistId=' + assistId + '&subjectId=' + subjectId,
        method: 'post',
        data
    })
}
export function quantityAmountGeneral(data) {
    return request({
        url: '/client/client/data/quantityAmountGeneral',
        method: 'post',
        data
    })
}
export function multiColumnLedger(data) {
    return request({
        url: '/client/client/data/multiColumnLedger',
        method: 'post',
        data
    })
}
export function accountingItemBalance(data, assistId) {
    return request({
        url: '/client/client/data/accountingItemBalance?assistId=' + assistId,
        method: 'post',
        data
    })
}
export function accItemDetailedTree(data, assistTypeId) {
    return request({
        url: '/client/client/data/accItemDetailedTree?assistTypeId=' + assistTypeId,
        method: 'post',
        data
    })
}
export function accountingItemDetailed(assistId, assistTypeId, data, subjectId) {
    return request({
        url: '/client/client/data/accountingItemDetailed?assistId=' + assistId + '&assistTypeId=' + assistTypeId + '&subjectId=' + subjectId,
        method: 'post',
        data
    })
}
// 总账拉去客户总数额

export function pull() {
    return request({
        url: '/client/total-account/pull',
        method: 'get',
    })
}

