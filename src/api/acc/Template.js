import request from '@/utils/request'
export function GetList() {
    return request({
        url: '/client/accounting/set-template/list',
        method: 'get'
    })
}


export function amend(id, isDefault, templateName) {
    return request({
        url: '/client/accounting/set-template/update?id=' + id + '&isDefault=' + isDefault + '&templateName=' + templateName,
        method: 'post'
    })
}