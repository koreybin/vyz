import request from '@/utils/request'
export function getlistPartData(dataType) {
  return request({
    url: '/account/accounting/sys-parameter/list',
    method: 'get',
    params: { dataType }
  })
}
export function parameterAdd(data) {
  return request({
    url: '/account/accounting/sys-parameter/parameterAdd',
    method: 'post',
    data
  })
}
export function parameterModify(data) {
  return request({
    url: '/account/accounting/sys-parameter/parameterModify',
    method: 'post',
    data
  })
}
export function parameterDel(parameterId) {
  return request({
    url: '/account/accounting/sys-parameter/parameterDel?parameterId=' + parameterId,
    method: 'delete',
  })
}
