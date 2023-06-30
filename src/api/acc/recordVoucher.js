import request from '@/utils/request'
// 新增凭证
export function addVoucher(data) {
    return request({
        url: 'client/accounting/act-voucher-import/addVoucher',
        method: 'post',
        data
    })
}
// 查凭证
export function getVoucherList(data, pageNum, pageSize) {
    return request({
        url: 'client/accounting/act-voucher-import/getVoucherList?pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'post',
        data
    })
}
// 获取指定凭证
export function getVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/getVoucher?voucherId=' + id,
        method: 'get',
    })
}
// 删除指定凭证
export function delVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/delete?voucherId=' + id,
        method: 'delete',
    })
}
// 审核指定凭证
export function auditVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/auditVoucher?voucherId=' + id,
        method: 'post',
    })
}
// 批量审核
export function batchReview(data) {
    return request({
        url: 'client/accounting/act-voucher-import/batchReview',
        method: 'post',
        data
    })
}
// 反审核
export function antiAuditVoucher(id) {
    return request({
        url: 'client/accounting/act-voucher-import/antiAuditVoucher?voucherId=' + id,
        method: 'post',
    })
}
// 批量反审核
export function batchAntiReview(data) {
    return request({
        url: 'client/accounting/act-voucher-import/batchAntiReview',
        method: 'post',
        data
    })
}
// 保存并修改
export function saveVoucher(data) {
    return request({
        url: 'client/accounting/act-voucher-import/saveAndModifyVoucher',
        method: 'post',
        data
    })
}
// 回收站列表
export function recycleList(data) {
    return request({
        url: 'client/accounting/act-voucher-import/recycleList',
        method: 'post',
        data
    })
}
// 批量复制
export function bulkCopy(date, data) {
    return request({
        url: 'client/accounting/act-voucher-import/bulkCopy?date=' + date,
        method: 'post',
        data
    })
}
// 整月复制
export function fMonthReplication(date, oldDate) {
    return request({
        url: 'client/accounting/act-voucher-import/fMonthReplication?date=' + date + '&oldDate=' + oldDate,
        method: 'post',
    })
}
// 回收站批量删除
export function recycleDel(data) {
    return request({
        url: 'client/accounting/act-voucher-import/recycleDel',
        method: 'delete',
        data
    })
}
// 回收站批量恢复
export function recycleReturn(data) {
    return request({
        url: 'client/accounting/act-voucher-import/recycleReturn',
        method: 'post',
        data
    })
}
// 批量删除
export function voucherDel(data) {
    return request({
        url: 'client/accounting/act-voucher-import/voucherDel',
        method: 'delete',
        data
    })
}
// 获取下个月凭证号
export function nextVoucherNum(date, id) {
    return request({
        url: 'client/accounting/act-voucher-import/nextVoucherNum?date=' + date + '&id=' + id,
        method: 'post',
    })
}
// 整理预览
export function vcnSortingPreview(data) {
    return request({
        url: 'client/accounting/act-voucher-import/vcnSortingPreview',
        method: 'post',
        data
    })
}
// 整理确认
export function vcnSorting(data) {
    return request({
        url: 'client/accounting/act-voucher-import/vcnSorting',
        method: 'post',
        data
    })
}
// 导入凭证
export function inputVoucher(file) {
    return request({
        url: 'client/accounting/act-voucher-import/importExcel',
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
