import request from '@/utils/request'
export function GetList() {
    return request({
        url: '/client/asset-class/downList',
        method: 'get'
    })
}
export function GetListPageByType() {
    return request({
        url: '/client/accounting/assist/getList?assistId=' + 11 + '&pageNum=' + 1 + '&pageSize=' + 10,
        method: 'get'
    })
}



export function cardList(condition, content) {
    return request({
        url: '/client/asset-card/cardList?condition=' + condition + '&content=' + content,
        method: 'get'
    })
}

// 删除
export function cancel(id) {
    return request({
        url: '/client/asset-card/remove?id=' + id,
        method: 'delete'
    })
}
// 批量删除
export function batchDelete(data) {
    return request({
        url: '/client/asset-card/batchDelete',
        method: 'delete',
        data
    })
}


// 列表根据资产类别进行显示
export function classify(id) {
    return request({
        url: '/client/asset-card/list?id=' + id,
        method: 'get'
    })
}

// 新增
export function increase(data) {
    return request({
        url: '/client/asset-card/insert',
        method: 'post',
        data
    })
}


// 修改
export function modification(data) {
    return request({
        url: '/client/asset-card/update',
        method: 'put',
        data
    })
}

// 设置默认科目
export function addSubjectId(data) {
    return request({
        url: '/client/asset-default-subject/addSubjectId',
        method: 'post',
        data
    })
}
// 获取默认科目
export function defaultAssetSubjectList() {
    return request({
        url: '/client/asset-default-subject/defaultAssetSubjectList',
        method: 'get',
    })
}
// 获取特定卡片
export function getById(id) {
    return request({
        url: '/client/asset-card/getById?id=' + id,
        method: 'get',
    })
}
// 清理卡片
export function clearCard(id) {
    return request({
        url: '/client/asset-card/clearCard?id=' + id,
        method: 'post',
    })
}
// 取消清理卡片
export function cancelClear(id) {
    return request({
        url: '/client/asset-card/cancelClear?id=' + id,
        method: 'post',
    })
}
// 复制卡片
export function copyCard(id, quantity) {
    return request({
        url: '/client/asset-card/copy?id=' + id + '&quantity=' + quantity,
        method: 'post',
    })
}
// 折旧汇总表
export function depreciationSummary(endPeriod, startPeriod) {
    return request({
        url: '/client/asset-card/depreciationSummary?endPeriod=' + endPeriod + '&startPeriod=' + startPeriod,
        method: 'get',
    })
}
// 折旧明细表
export function depreciationSchedule(endPeriod, startPeriod) {
    return request({
        url: '/client/asset-card/depreciationSchedule?endPeriod=' + endPeriod + '&startPeriod=' + startPeriod,
        method: 'get',
    })
}



