import request from '@/utils/request'
export const list = function (date, type) {
    return request({
        url: 'client/cash-flow-statement/getList?date=' + date + '&type=' + type,
        method: 'get'
    })
}