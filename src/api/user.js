import request from '@/utils/request'

export function getlistuserByorgid(query) {

  return request({
    url: '/account/accounting/user/list',
    method: 'get',
    params: query
  })

}


export function addEmpUser(data) {
  return request({
    url: '/account/accounting/user/addEmpUser',
    method: 'post',
    data
  })
}
export function updateUser(data) {
  return request({
    url: '/account/accounting/user/updateUser',
    method: 'post',
    data
  })
}

export function orginuser(userId) {

  return request({
    url: '/account/accounting/user/orgByUser',
    method: 'get',
    params: { userId }
  })

}

export function changeDept(data) {
  return request({
    url: '/account/accounting/user/changeDept',
    method: 'post',
    data
  })
}
export function changePost(data) {
  return request({
    url: '/account/accounting/user/changePost',
    method: 'post',
    data
  })
}

export function getPost() {
  return request({
    url: '/account/accounting/dictionary/postByUser',
    method: 'get',
  })
}

export function deleteUser(data) {
  return request({
    url: '/account/accounting/user/deleted',
    method: 'delete',
    data
  })
}



