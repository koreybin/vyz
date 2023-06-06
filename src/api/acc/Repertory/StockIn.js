import request from '@/utils/request'
//下拉列表
export function GetList() {
    return request({
        url: '/client/inventory-management/downList',
        method: 'get'
    })
}
export function GetListone(conditions, pageNum, pageSize) {
    return request({
        url: '/client/inventory-management/list?conditions=' + conditions + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'get'
    })
}


// 搜索
export function tool(condition, endDate, source, startDate, type) {
    return request({
        url: '/client/inventory-warehousing-entry/list?condition=' + condition + '&endDate=' + endDate + "&source=" + source + "&startDate=" + startDate + "&type=" + type,
        method: 'get'
    })
}

// 出库单列表
export function outList(condition, endDate, source, startDate, type) {
    return request({
        url: '/client/inventory-outbound-order/list?condition=' + condition + '&endDate=' + endDate + "&source=" + source + "&startDate=" + startDate + "&type=" + type,
        method: 'get'
    })
}

// 供应商
export function GetListPageByType() {
    return request({
        url: '/client/accounting/assist/getList?assistId=' + 8 + '&pageNum=' + 1 + '&pageSize=' + 10,
        method: 'get'
    })
}


// 入库保存

export function increased(data) {
    return request({
        url: '/client/inventory-warehousing-entry/addEntry',
        method: 'post',
        data
    })
}
// 出库保存
export function delivery(data) {
    return request({
        url: '/client/inventory-outbound-order/addEntry',
        method: 'post',
        data
    })
}

// 查看
export function checkList(id) {
    return request({
        url: '/client/inventory-warehousing-entry/getOne?id=' + id,
        method: 'get',
    })
}

// 删除指定入库单
export function del(ids) {
    return request({
        url: '/client/inventory-warehousing-entry/del?ids=' + ids,
        method: 'delete',
    })
}

// 查看存货汇总表单数据
export function getSummaryList(end, id, monthSummary, start) {
    return request({
        url: `client/inventory-warehousing-entry/inventorySummary?end=${end}&id=${id}&monthSummary=${monthSummary}&start=${start}`,
        method: 'get'
    })
}

// 查看存货收发明细
export function getSumDetail(end, id, start) {
    return request({
        url: `client/inventory-warehousing-entry/InventoryDetailsList?end=${end}&id=${id}&start=${start}`,
        method: 'get'
    })
}





