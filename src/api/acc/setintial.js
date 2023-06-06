import request from '@/utils/request'
export function GetList(type) {
  return request({
    url: '/client/accounting/initial-amount/getList?type=' + type,
    method: 'get'
  })
}
export function exportinitial() {
  return request({
    url: '/client/accounting/initial-amount/export',
    method: 'get'
  })
}


// 点击加号获取辅助核算
export function accounting(assistId) {
  return request({
    url: '/client/accounting/assist/getList?assistId=' + assistId + '&pageNum=' + 0 + '&pageSize=' + 500,
    method: 'get',
  })
}

// 删除
export function shan(id) {
  return request({
    url: '/client/accounting/initial-amount/deleteAssist?initialId=' + id,
    method: 'delete',

  })
}

// 点击确定按钮
export function produce(subjectId, data) {
  return request({
    url: '/client/accounting/initial-amount/assistAdd?subjectId=' + subjectId,
    method: 'put',
    data
  })
}

//保存
export function save(data) {
  return request({
    url: '/client/accounting/initial-amount/add',
    method: 'post',
    data
  })
}




// 点击加号获取辅助核算类别
export function token() {
  return request({
    url: '/client/accounting/assist/getType',
    method: 'get',

  })
}

export function addprove(data) {
  return request({
    url: '/client/accounting/prove-data/insert',
    method: 'post',
    data
  })
}

export function updateDataprov(data) {
  return request({
    url: '/client/accounting/prove-data/update',
    method: 'post',
    data
  })
}

export function deleteprov(proveId) {
  return request({
    url: '/client/accounting/prove-data/delete',
    method: 'delete',
    params: { proveId }
  })

}

export function upstate(subjectCode) {
  return request({
    url: '/client/accounting/set-subject/status?subjectCode=' + subjectCode,
    method: 'post'

  })
}
export function trialBalance() {
  return request({
    url: 'client/accounting/initial-amount/trialBalance',
    method: 'get'

  })
}






