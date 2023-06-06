import request from '@/utils/request'
export function GetListType() {
  return request({
    url: '/client/accounting/assist/getType',
    method: 'get'
  })
}
export function Addassisttype(name) {
  return request({
    url: '/client/accounting/assist/addType?name=' + name,
    method: 'post'

  })
}

export function updateType(id, name) {
  return request({
    url: '/client/accounting/assist/updateType?id=' + id + '&name=' + name,
    method: 'put',
  })
}


export function deletedType(id) {
  return request({
    url: '/client/accounting/assist/deletedType?id=' + id,
    method: 'DELETE',
  })
}



