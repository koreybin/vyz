import request from '@/utils/request'
export function getlistClientData(data,pagenum,pagesize) 
{
  return request({
    url: '/account/accounting/client/getList?pageNum='+pagenum+'&pageSize='+pagesize,
    method: 'post',
    data
  })
}

export function addclient(data) 
{
  return request({
    url: '/account/accounting/client/setData',
    method: 'post',
    data
  })
}

