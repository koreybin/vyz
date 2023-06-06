import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './vulnerabilityManagement'

import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
// Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)
// 通告相关
Mock.mock(/\/notification\/list/, 'get', notificationAPI.getList)
Mock.mock(/\/notification\/detail/, 'get', notificationAPI.getArticle)
Mock.mock(/\/notification\/pv/, 'get', notificationAPI.getPv)
Mock.mock(/\/notification\/create/, 'post', notificationAPI.createArticle)
Mock.mock(/\/notification\/update/, 'post', notificationAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock
