import request from '@/utils/request'
export function addVoucher(data) {
    return request({
        url: 'client/accounting/act-voucher-import/addVoucher',
        method: 'post',
        data
    })
}
export function getVoucherList(data, pageNum, pageSize) {
    return request({
        url: 'client/accounting/act-voucher-import/getVoucherList?pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'post',
        data
    })
}
export function getVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/getVoucher?voucherId=' + id,
        method: 'get',
    })
}
export function delVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/delete?voucherId=' + id,
        method: 'delete',
    })
}
export function auditVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/auditVoucher?voucherId=' + id,
        method: 'post',
    })
}
export function batchReview(data) {
    return request({
        url: 'client/accounting/act-voucher-import/batchReview',
        method: 'post',
        data
    })
}
export function antiAuditVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/antiAuditVoucher?voucherId=' + id,
        method: 'post',
    })
}
export function batchAntiReview(data) {
    return request({
        url: 'client/accounting/act-voucher-import/batchAntiReview',
        method: 'post',
        data
    })
}
export function saveVoucher(data) {
    return request({
        url: 'client/accounting/act-voucher-import/saveAndModifyVoucher',
        method: 'post',
        data
    })
}
export function recycleList(data) {
    return request({
        url: 'client/accounting/act-voucher-import/recycleList',
        method: 'post',
        data
    })
}
export function bulkCopy(date, data) {
    return request({
        url: 'client/accounting/act-voucher-import/bulkCopy?date=' + date,
        method: 'post',
        data
    })
}
export function fMonthReplication(date, oldDate) {
    return request({
        url: 'client/accounting/act-voucher-import/fMonthReplication?date=' + date + '&oldDate=' + oldDate,
        method: 'post',
    })
}
export function recycleDel(data) {
    return request({
        url: 'client/accounting/act-voucher-import/recycleDel',
        method: 'delete',
        data
    })
}
export function recycleReturn(data) {
    return request({
        url: 'client/accounting/act-voucher-import/recycleReturn',
        method: 'post',
        data
    })
}
export function voucherDel(data) {
    return request({
        url: 'client/accounting/act-voucher-import/voucherDel',
        method: 'delete',
        data
    })
}
export function nextVoucherNum(date, id) {
    return request({
        url: 'client/accounting/act-voucher-import/nextVoucherNum?date=' + date + '&id=' + id,
        method: 'post',
    })
}
export function vcnSortingPreview(data) {
    return request({
        url: 'client/accounting/act-voucher-import/vcnSortingPreview',
        method: 'post',
        data
    })
}
export function vcnSorting(data) {
    return request({
        url: 'client/accounting/act-voucher-import/vcnSorting',
        method: 'post',
        data
    })
}
