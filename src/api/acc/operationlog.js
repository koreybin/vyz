import request from '@/utils/request'
export function GetList(endData,pageNum,pageSize,startData,value) 
{

 var nurl='/client/accounting/set-operation-log/getList?pageNum='+pageNum+'&pageSize='+pageSize
  if(startData!=null){
    nurl+='&startData='+startData
  }

  if(endData!=null){
    nurl+='&endData='+endData
  }
  if(value!=''){
    nurl+='&value='+value
  }
  
  return request({
    url: nurl,
    method: 'get'
  })
}







