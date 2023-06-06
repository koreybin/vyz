import request from '@/utils/request'
export function GetList(pageNum,pageSize) 
{
  return request({
    url: '/client/accounting/prove-data/list?pageNum='+pageNum+'&pageSize='+pageSize,
    method: 'get'
  })
}

export function addprove(data) 
{ 
  return request({
    url: '/client/accounting/prove-data/insert',
    method: 'post',
    data
  })
}

export function updateDataprov(data) 
{ 
  return request({
    url: '/client/accounting/prove-data/update',
    method: 'put',
    data
  })
}

export function deleteprov(proveId) 
{ 
  return request({
    url: '/client/accounting/prove-data/delete',
    method: 'delete',
    params: {proveId}
  })
 
}

export function updownprov(id,val) 
{ 
  return request({
    url: '/client/accounting/prove-data/sort?proveId='+id+'&value='+val,
    method: 'put'

  })
}






