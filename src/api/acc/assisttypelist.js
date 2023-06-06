import request from '@/utils/request'
export function GetListPageByType(assistId,pageNum,pageSize) 
{
  return request({
    url: '/client/accounting/assist/getList?assistId='+assistId+'&pageNum='+pageNum+'&pageSize='+pageSize,
    method: 'get'
  })  
}


export function addsisst(data) 
{ 
  return request({
    url: '/client/accounting/assist/addAssist',
    method: 'post',
    data
  })
}

export function updatesisst(data) 
{ 
  return request({
    url: '/client/accounting/assist/update',
    method: 'put',
    data
  })
}

export function remove(type,id){
  return request({
    url:'/client/accounting/assist/del?assistId='+type+'&id='+id,
    method:'delete',

  })


}
