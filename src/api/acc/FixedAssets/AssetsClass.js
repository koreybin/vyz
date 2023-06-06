import request from '@/utils/request'
export function GetList() {
    return request({
        url: '/client/asset-class/list',
        method: 'get'
    })
}

// 删除
export function del(id) {
    return request({
        url: '/client/asset-class/delete?id=' + id,
        method: 'delete'
    })
}

// 修改


export function compile(data) {
    return request({
        url: '/client/asset-class/change',
        method: 'put',
        data
    })
}



// 新增
export function increased(data) {
    return request({
        url: '/client/asset-class/insert',
        method: 'post',
        data
    })
}