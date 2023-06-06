import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/account/accounting/relation/allPost',
    method: 'get',
    params: query
  })
}


export function addJob(data) {
  return request({
    url: '/account/accounting/relation/addPost',
    method: 'post',
    data
  })
}


export function deleteJob(postId) {
  return request({
    url: '/account/accounting/relation/del',
    method: 'delete',
    params: { postId }
  })
}

export function updateJob(data) {
  return request({
    url: '/account/accounting/relation/updatePost',
    method: 'post',
    data
  })
}



export function orgTree(postId) {
  return request({
    url: '/account/accounting/user/orgTree',
    method: 'post',
    params: { postId }
  })
}