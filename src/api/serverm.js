import request from '@/utils/request'
export function getlistServerData(data, pagenum, pagesize) {
  return request({
    url: '/account/accounting/client-service/serviceList?pageNum=' + pagenum + '&pageSize=' + pagesize,
    method: 'get',
    data
  })
}
//获取会计制度下拉框
export function getSystemList() {
  return request({
    url: '/account/account-system/getList',
    method: 'get',
  })
}
//创建账套
export function createACSet(data) {
  return request({
    url: '/account/accounting/client/createACSet',
    method: 'post',
    data
  })
}
// 获取客户列表（高级查询）
export function getService(data, deleteid, pagenum, pagesize) {
  return request({
    url: '/account/accounting/client/getList?delete=' + deleteid + '&pageNum=' + pagenum + '&pageSize=' + pagesize,
    method: 'post',
    data
  })
}
// 获取派工客户数树
export function getNumTree(post, status) {
  return request({
    url: '/account/accounting/dispatch-info/numTree?post=' + post + '&status=' + status,
    method: 'get'
  })
}
// 保存派工
export function save(data) {
  return request({
    url: '/account/accounting/dispatch-info/save',
    method: 'post',
    data
  })
}
// 转派工
export function transferred(dispatchId, userId) {
  return request({
    url: '/account/accounting/dispatch-info/transferred?dispatchId=' + dispatchId + '&userId=' + userId,
    method: 'post',
  })
}
// 删除派工
export function delDispatch(id) {
  return request({
    url: '/account/accounting/dispatch-info/delDispatch?id=' + id,
    method: 'delete',
  })
}
// 跟进列表
export function getFollowList(clientId, search) {
  return request({
    url: '/account/accounting/follow-record/list?clientId=' + clientId + '&search=' + search,
    method: 'get',
  })
}
// 新增跟进
export function addRecord(data) {
  return request({
    url: '/account/accounting/follow-record/addRecord',
    method: 'post',
    data
  })
}
// 删除跟进
export function delRecord(id) {
  return request({
    url: '/account/accounting/follow-record/del?id=' + id,
    method: 'delete',
  })
}
// 置顶跟进
export function topRecord(id) {
  return request({
    url: '/account/accounting/follow-record/top?id=' + id,
    method: 'post',
  })
}
// 取消置顶跟进
export function cancelTopRecord(id) {
  return request({
    url: '/account/accounting/follow-record/cancel?id=' + id,
    method: 'post',
  })
}
// 停止服务
export function outService(data) {
  return request({
    url: '/account/accounting/client/outService',
    method: 'post',
    data
  })
}
// 停止服务
export function recover(data) {
  return request({
    url: '/account/accounting/client/recover',
    method: 'post',
    data
  })
}



