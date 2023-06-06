import request from '@/utils/request'
export function GetList(pageNum,pageSize) 
{
  return request({
    url: '/client/accounting/currency/list?pageNum='+pageNum+'&pageSize='+pageSize,
    method: 'get'
  })
}

export function addcurrency(data) 
{ 
  return request({
    url: '/client/accounting/currency/add',
    method: 'post',
    data
  })
}

export function updateCurrency(data) 
{ 
  return request({
    url: '/client/accounting/currency/change',
    method: 'put',
    data
  })
}

export function deletecurrency(id) 
{ 
  return request({
    url: '/client/accounting/currency/delete',
    method: 'delete',
    params: {id}
  })
 
}





