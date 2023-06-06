import request from '@/utils/request'

//
export function loginByUserphone(userPhone, password, uuid, captcha) {
  const data =
  {
    userPhone,
    password,
    uuid,
    captcha,
  }
  return request({
    url: '/account/accounting/user/login',
    method: 'post',
    data
  })
}
//
export function logout(token) {
  return request({
    url: '/account/accounting/user/logout',
    method: 'get'
  })
}

//获取用户信息
export function getUserInfo(token) {
  return request({
    url: '/account/accounting/user/getUser',
    method: 'get'
  })
}



