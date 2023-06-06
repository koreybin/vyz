import request from '@/utils/request'
export function GetList(conditions, pageNum, pageSize) {
    return request({
        url: '/client/inventory-management/list?conditions=' + conditions + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
        method: 'get'
    })
}


// 新增
export function augment(data) {
    return request({
        url: '/client/inventory-management/insert',
        method: 'post',
        data
    })
}

// 删除
export function del(id) {
    return request({
        url: '/client/inventory-management/delete?id=' + id,
        method: 'delete',

    })
}

// 修改
export function modification(data) {
    return request({
        url: '/client/inventory-management/update',
        method: 'put',
        data
    })
}
