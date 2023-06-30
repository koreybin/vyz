import request from '@/utils/request'
// 明细账树
export function getTree(data) {
    return request({
        url: '/client/client/data/tree',
        method: 'post',
        data
    })
}
// 明细账表
export function detailedBooks(assistId, data, subjectId) {
    return request({
        url: '/client/client/data/detailedBooks?assistId=' + assistId + '&subjectId=' + subjectId,
        method: 'post',
        data
    })
}
// 总账
export function generalLedger(data) {
    return request({
        url: '/client/client/data/generalLedger',
        method: 'post',
        data
    })
}
// 凭证汇总表
export function voucherSummary(data) {
    return request({
        url: '/client/client/data/voucherSummary',
        method: 'post',
        data
    })
}
// 科目余额表
export function subjectBalance(data) {
    return request({
        url: '/client/client/data/subjectBalance',
        method: 'post',
        data
    })
}
// 数量明细树
export function quantityAmountDetailsTree(data) {
    return request({
        url: '/client/client/data/quantityAmountDetailsTree',
        method: 'post',
        data
    })
}
// 数量明细表
export function quantityAmountDetails(assistId, data, subjectId) {
    return request({
        url: '/client/client/data/quantityAmountDetails?assistId=' + assistId + '&subjectId=' + subjectId,
        method: 'post',
        data
    })
}
// 数量金额总账
export function quantityAmountGeneral(data) {
    return request({
        url: '/client/client/data/quantityAmountGeneral',
        method: 'post',
        data
    })
}
// 多栏账
export function multiColumnLedger(data) {
    return request({
        url: '/client/client/data/multiColumnLedger',
        method: 'post',
        data
    })
}
// 项目余额表
export function accountingItemBalance(data, assistId) {
    return request({
        url: '/client/client/data/accountingItemBalance?assistId=' + assistId,
        method: 'post',
        data
    })
}
// 核酸项目明细树
export function accItemDetailedTree(data, assistTypeId) {
    return request({
        url: '/client/client/data/accItemDetailedTree?assistTypeId=' + assistTypeId,
        method: 'post',
        data
    })
}
// 核算项目余额表
export function accountingItemDetailed(assistId, assistTypeId, data, subjectId) {
    return request({
        url: '/client/client/data/accountingItemDetailed?assistId=' + assistId + '&assistTypeId=' + assistTypeId + '&subjectId=' + subjectId,
        method: 'post',
        data
    })
}
// 总账拉取客户总数额

export function pull() {
    return request({
        url: '/client/total-account/pull',
        method: 'get',
    })
}

