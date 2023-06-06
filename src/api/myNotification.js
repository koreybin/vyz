import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/notification/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/notification/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/notification/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) 
{
  return request({
    url: '/notification/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/notification/update',
    method: 'post',
    data
  })
}
