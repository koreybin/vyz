import request from '@/utils/request'
// 获取核算列表
export function GetListPageByType(assistId, pageNum, pageSize) {
  return request({
    url: '/client/accounting/assist/getList?assistId=' + assistId + '&pageNum=' + pageNum + '&pageSize=' + pageSize,
    method: 'get'
  })
}

// 新增辅助核算类别
export function addsisst(data) {
  return request({
    url: '/client/accounting/assist/addAssist',
    method: 'post',
    data
  })
}
// 修改类别
export function updatesisst(data) {
  return request({
    url: '/client/accounting/assist/update',
    method: 'put',
    data
  })
}
// 删除类别
export function remove(type, id) {
  return request({
    url: '/client/accounting/assist/del?assistId=' + type + '&id=' + id,
    method: 'delete',

  })


}
