import request from '@/utils/request'

export function getArea() {
  return request({
    url: '/account/accounting/rc-district/getAreaById', 
    method: 'get'
  })
}
