import request from '@/utils/request'

export function getlistByPost(postId) 
{
  return request({
    url: '/account/accounting/authority/listByPost',
    method: 'get',
    params: {postId}
  })
}


export function getlistByUser(userId) 
{
  return request({
    url: '/account/accounting/authority/listByUser',
    method: 'get',
    params: {userId}
  })
}


export function updateorg(data) 
{
  return request({
    url: '/account/accounting/authority/addPostOrg',
    method: 'post',
    data
  })
}


export function addUserOrg(data) 
{
  return request({
    url: '/account/accounting/authority/addUserOrg',
    method: 'post',
    data
  })
}
