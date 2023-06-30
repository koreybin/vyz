import request from '@/utils/request'
// 获取辅助核算类别
export function GetListType() {
  return request({
    url: '/client/accounting/assist/getType',
    method: 'get'
  })
}
// 新增
export function Addassisttype(name) {
  return request({
    url: '/client/accounting/assist/addType?name=' + name,
    method: 'post'

  })
}
// 编辑
export function updateType(id, name) {
  return request({
    url: '/client/accounting/assist/updateType?id=' + id + '&name=' + name,
    method: 'put',
  })
}
// 删除
export function deletedType(id) {
  return request({
    url: '/client/accounting/assist/deletedType?id=' + id,
    method: 'DELETE',
  })
}



