import request from '@/utils/request'
export function GetTempList(pageNum, pageSize) {
  return request({
    url: '/client/accounting/voucher-temp/list',
    method: 'get'
  })
}
export function deletecvouchetemp(tempId) {
  return request({
    url: '/client/accounting/voucher-temp/delete?tempId=' + tempId,
    method: 'delete',

  })

}

export function updatevouchertemp(data) {
  return request({
    url: '/client/accounting/voucher-temp/update',
    method: 'put',
    data
  })
}

export function gettypeList() {
  return request({
    url: '/client/accounting/voucher-temp/getType',
    method: 'get'
  })
}
export function getOne(id) {
  return request({
    url: '/client/accounting/voucher-temp/getOne?tempId=' + id,
    method: 'get'
  })
}
export function addTemplate(name, saveMoney, saveProject, type, data) {
  return request({
    url: `/client/accounting/voucher-temp/addTemplate?name=${name}&saveMoney=${saveMoney}&saveProject=${saveProject}&type=${type}`,
    method: 'post',
    data
  })
}










