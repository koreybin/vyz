import request from '@/utils/request'
export function GetList(pageNum, pageSize, type) {
  return request({
    url: '/client/accounting/set-subject/list?pageNum=' + pageNum + '&pageSize=' + pageSize + '&type=' + type,
    method: 'get'
  })
}

export function added(data) {
  return request({
    url: '/client/accounting/assist/getType',
    method: 'get',
    data
  })
}
export function course(type) {
  return request({
    url: '/client/accounting/act-dictionary/list?type=' + type,
    method: 'get',
    type
  })
}

export function updownprov(row) {
  return request({
    url: '/client/accounting/set-subject/addSub',
    method: 'post',
    row
  })
}
export function addChild(data, subjectCode) {
  return request({
    url: '/client/accounting/set-subject/addSub?subjectCode=' + subjectCode,
    method: 'post',
    data
  })
}

export function addprov(data) {
  return request({
    url: '/client/accounting/set-subject/add',
    method: 'post',
    data
  })
}

export function updateDataprov(data) {
  return request({
    url: 'client/accounting/set-subject/change',
    method: 'post',
    data
  })
}

export function deleteprov(subjectId) {
  return request({
    url: '/client/accounting/set-subject/del?subjectId=' + subjectId,
    method: 'delete',
  })

}

export function upstate(subjectCode) {
  return request({
    url: '/client/accounting/set-subject/status?subjectCode=' + subjectCode,
    method: 'put'
  })
}
// -----------主系统科目

export function delSubject(data) {
  return request({
    url: '/account/set-default-subject/delSubject',
    method: 'delete',
    data
  })
}
export function addSubject(data) {
  return request({
    url: '/account/set-default-subject/add',
    method: 'post',
    data
  })
}
export function modifySubject(data) {
  return request({
    url: '/account/set-default-subject/modifySubject',
    method: 'post',
    data
  })
}
export function getType() {
  return request({
    url: '/account/set-default-subject/getType',
    method: 'get'
  })
}





