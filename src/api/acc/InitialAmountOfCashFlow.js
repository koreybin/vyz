import request from '@/utils/request'

export function GetList() 
{
  return request({
    url: '/client/accounting/initial-cf-items-amount/getList',
    method: 'get'
  })
}


export function poise() 
{
  return request({
    url: '/client/accounting/initial-cf-items-amount/automaticLeveling',
    method: 'post'
  })
}