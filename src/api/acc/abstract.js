import request from '@/utils/request'
// 摘要列表
export function GetListabs() {
  return request({
    url: '/client/accounting/abstract-content/list',
    method: 'get'
  })
}
// 摘要增加
export function addListabs(data) {
  return request({
    url: '/client/accounting/abstract-content/add?content=' + data,
    method: 'post',
  })
}
// 摘要删除
export function delListabs(id) {
  return request({
    url: '/client/accounting/abstract-content/delete',
    method: 'delete',
    params: { id }
  })
}
// 摘要更新
export function updateListabs(data) {
  return request({
    url: '/client/accounting/abstract-content/update',
    method: 'post',
    data
  })
}
