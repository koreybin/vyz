import request from '@/utils/request'
//树结构
export function GetList(subjectType) {
    return request({
        url: '/client/accounting/set-subject/tree?subjectType=' + subjectType,
        method: 'get'
    })
}
// 列表结构
export function GetAllList() {
    return request({
        url: '/client/accounting/set-subject/subjectLikeQuery',
        method: 'get'
    })
}
// 类别
export function add(type) {
    return request({
        url: '/client/accounting/act-dictionary/list?type=' + type,
        method: 'get'
    })
}



// 列表
export function gain(businessType) {
    return request({
        url: '/client/accounting/bill-voucher-temp/voucherList?businessType=' + businessType,
        method: 'get'
    })
}

// 下拉列表
export function Spinne(businessType, status) {
    return request({
        url: '/client/accounting/bill-voucher-temp/downList?businessType=' + businessType + '&status=' + status,
        method: 'get'
    })
}

// 票据凭证模板删除模板分录

export function delet(billId, entriesId) {
    return request({
        url: '/client/accounting/bill-voucher-temp/deleteEntries?billId=' + billId + '&entriesId=' + entriesId,
        method: 'delete'
    })
}
// 获取票据凭证模板列表
export function getDefListByType(system, taxType, type) {
    return request({
        url: 'account/set-def-bill-voucher-temp/getDefListByType?system=' + system + '&taxpayerType=' + taxType + '&type=' + type,
        method: 'get'
    })
}
// 新增凭证模板
export function addTemp(data) {
    return request({
        url: 'account/set-def-bill-voucher-temp/addTemp',
        method: 'post',
        data
    })
}
// 修改模板摘要
export function editSummary(id, summary) {
    return request({
        url: 'account/set-def-bill-voucher-temp/editSummary?id=' + id + '&summary=' + summary,
        method: 'post'
    })
}
// 保存
export function saveTempEntries(data) {
    return request({
        url: 'account/set-def-bill-voucher-temp/saveTempEntries',
        method: 'post',
        data
    })
}
// 以外修改保存
export function updateTemp(data) {
    return request({
        url: 'account/set-def-bill-voucher-temp/updateTemp',
        method: 'post',
        data
    })
}
// 科目树
export function getSubjectTree(system, type) {
    return request({
        url: 'account/set-default-subject/tree?system=' + system + '&type=' + type,
        method: 'get',
    })
}
export function getSubjectAll(system) {
    return request({
        url: 'account/set-default-subject/getAll?system=' + system,
        method: 'get',
    })
}
export function getAllByType(system, type) {
    return request({
        url: 'account/set-default-subject/getAllByType?system=' + system + '&type=' + type,
        method: 'get',
    })
}
export function getCFAllByType(system, type) {
    return request({
        url: 'account/set-def-subj-cf-items/getAllByType?system=' + system + '&type=' + type,
        method: 'get',
    })
}
export function getMasterTableItem(isMaster, system) {
    return request({
        url: 'account/set-def-subj-cf-items/getMasterTableItem?isMaster=' + isMaster + '&system=' + system,
        method: 'get',
    })
}
export function modifyMasterTableItem(data) {
    return request({
        url: 'account/set-def-subj-cf-items/modify',
        method: 'post',
        data
    })
}
