import request from '@/utils/request'
export function GetList() {
  return request({
    url: '/client/accounting/parameters/Info',

    method: 'get'
  })
}


export function updateCurrency(data) {
  return request({
    url: '/client/accounting/parameters/change',
    method: 'put',
    data
  })
}

export function updateSubject(data) {
  return request({
    url: '/client/accounting/parameters/insert',
    method: 'put',
    data
  })

}





