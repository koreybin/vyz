import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import merge from 'lodash/merge'
import qs from 'qs'
import router from '@/router'


// create an axios instance,创建axios实例
let base = 'api'
// let base = '/api'
const service = axios.create({
  baseURL: base, // api的base_url
  // baseURL: process.env.BASE_API + base, // api的base_url
  timeout: 6000,// request timeout 请求超时时间
  // withCredentials: true, 
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
// axios.defaults.baseURL = process.env.BASE_API
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'

// request interceptor request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  const token = getToken()
  if (store.getters.token) {
    config.headers['X-Token'] = token // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor respone拦截器
service.interceptors.response.use(
  response => response,
  response => {
    /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */

    if (response.response.data.retCode === 406) {
      return
    }

    if (response.response.status === 400) {
      Message.error(response.response.data.message)
    } else if (response.response.status === 401) {
      MessageBox.alert('你已被登出,请重新登录', '确定登出', {
        confirmButtonText: '确认'
      }).then(() => {
        removeToken()
        window.location.reload(true)
      })

    } else if (response.response.status === 500) {
      Message.error('serve error')
    }
    else {
      Message({
        message: response.response.data.message,
        type: 'error',
        duration: 3 * 1000
      })
    }



  })


// for debug
//    if (res.code !== 20000) {
//      Message({
//        message: res.message,
//        type: 'error',
//        duration: 5 * 1000
//      });
//      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//          confirmButtonText: '重新登录',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          store.dispatch('FedLogOut').then(() => {
//            location.reload();// 为了重新实例化vue-router对象 避免bug
//          });
//        })
//      }
//      return Promise.reject('error');
//    } else {
//      return response.data;
//    }
// },

/**
* post请求数据处理
* @param {*} data 数据对象
* @param {*} openDefultdata 是否开启默认数据?
* @param {*} contentType 数据格式
*  json: 'application/json; charset=utf-8'
*  form: 'application/x-www-form-urlencoded; charset=utf-8'
*/
service.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {

  // var defaults = {
  //   't': new Date().getTime()
  // }
  data = openDefultdata ? merge(data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
service.adornParams = (params = {}, openDefultParams = true) => {

  return openDefultParams ? merge(params) : params
}


export default service
