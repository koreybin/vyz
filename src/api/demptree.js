import request from '@/utils/request'

export function getlistdata(userId) {

  return request({
    url: '/account/accounting/user/orgByUser',
    method: 'get',
    params: { userId }
  })
}


export function getlistdatae(organizationId) {

  return request({
    url: '/account/accounting/user/allOrg',
    method: 'post',
    organizationId
  })
}


export function adddemp(data) {
  return request({
    url: '/account/accounting/dictionary/add',
    method: 'post',
    data
  })
}


export function deletedemp(id) {
  return request({
    url: '/account/accounting/dictionary/del',
    method: 'delete',
    params: { id }
  })
}


export function updatedemp(data) {
  return request({
    url: '/account/accounting/dictionary/update',
    method: 'post',
    data
  })
}



export function postByUser() {

  return request({
    url: '/account/accounting/dictionary/postByUser',
    method: 'get'

  })
}



