import request from '@/utils/request'
export function menuByUserz() 
{
  return request({
    url: '/account/accounting/sys-menu/menuByUser',
    method: 'get'
  })
}
