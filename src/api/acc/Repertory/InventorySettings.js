import request from '@/utils/request'
export function GetList() {
    return request({
        url: '/client/inventory-basic-settings/list',
        method: 'get'
    })
}
export function initial(pageNum, pageSize) {
    return request({
        url: '/client/inventory-basic-settings/initial?pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'get'
    })
}


// 获取当前时间
export function getPeriod() {
    return request({
        url: '/client/client/data/getPeriod',
        method: 'put'
    })
}
// 获取用户信息
export function getData() {
    return request({
        url: '/client/client/data/getData',
        method: 'get'
    })
}

// 保存
export function setting(data) {
    return request({
        url: '/client/inventory-basic-settings/setUp',
        method: 'post',
        data
    })
}
// 下载模板
export function downloadModel() {
    return request({
        url: '/client/inventory-basic-settings/export',
        method: 'post',
        responseType: 'blob'
    })
}
// 看是否开启库存
export function getSettingState() {
    return request({
        url: '/client/inventory-basic-settings/getSettingState',
        method: 'get'
    })
}
export function importFile(data) {
    return request({
        url: '/client/inventory-basic-settings/import',
        method: 'post',
        data
    })
}

