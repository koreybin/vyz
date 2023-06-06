import request from '@/utils/request'
export function GetList(dataType) {
  return request({
    url: '/client/accounting/subj-items/list?dataType=' + dataType,
    method: 'get'
  })
}

// 显示现金流量主表和附表

export function show(accSys, isMainTable) {
  return request({
    url: '/client/accounting/subj-items/itemList?accSys=' + accSys + '&isMainTable=' + isMainTable,
    method: 'get',
  })
}

// 选择现金流量主表和附表

export function poise(data) {
  return request({
    url: 'client/accounting/subj-items/choiceCf',
    method: 'put',
    data
  })
}