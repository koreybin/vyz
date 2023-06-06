import request from '@/utils/request'
export function GetListabs() {
  return request({
    url: '/client/accounting/abstract-content/list',
    method: 'get'
  })
}
export function addListabs(data) {
  return request({
    url: '/client/accounting/abstract-content/add?content=' + data,
    method: 'post',
  })
}
export function delListabs(id) {
  return request({
    url: '/client/accounting/abstract-content/delete',
    method: 'delete',
    params: { id }
  })
}
export function updateListabs(data) {
  return request({
    url: '/client/accounting/abstract-content/update',
    method: 'post',
    data
  })
}
