import request from '@/utils/request'

// 获取列表
export function GetListabs() {
    return request({
        url: '/client/set-attachment/list',
        method: 'get'
    })
}

// 上传文件

export function uploading(file, fileName) {
    return request({
        url: '/client/set-attachment/upload?fileName=' + fileName,
        method: 'post',
        data: file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

//查看文件
export function check(id) {
    return request({
        url: '/client/set-attachment/getOne?id=' + id,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-msdownload'
        },
        responseType: 'blob'
    })
}

// 删除


export function del(id) {
    return request({
        url: '/client/set-attachment/delete?id=' + id,
        method: 'delete'
    })
}