import { loginByUserphone, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { getPeriod, getData } from "@/api/acc/Repertory/InventorySettings"
import { constantRouterMap } from '@/router'
import { constantRouterMapAcc } from '@/router/indexacc'
import Layout from '../../views/layout/Layout'
import Layoutacc from '../../views/layoutacc/Layout'
import { Message } from 'element-ui'
const _import = require('../../router/_import_' + process.env.NODE_ENV)

// import { getId, removeCurrid, setID } from '../../utils/auth'

const user = {
  state: {
    headImgUrl: '',
    phone: '',
    user: '',
    status: '',
    id: '',
    period: '',
    numberOfPeriods: '',
    nOfPeriods: '',
    customData: {},
    token: getToken(),
    name: '',
    org: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    routers: null,
    addRouters: [],
    routers2: null,
    addRouters2: []
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_HEAD_URL: (state, headImgUrl) => {
      state.headImgUrl = headImgUrl
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_ROUTERS2: (state, routers2) => {
      state.addRouters2 = routers2
      state.routers2 = constantRouterMapAcc.concat(routers2)
    },
    SET_PERIOD: (state, period) => {
      state.period = period
    },
    SET_NUMBEROFPERIODS: (state, numberOfPeriods) => {
      state.numberOfPeriods = numberOfPeriods
    },
    SET_NOFPERIODS: (state, nOfPeriods) => {
      state.nOfPeriods = nOfPeriods
    },
    SET_CUSTOMDATA: (state, customData) => {
      state.customData = customData
    },
    SET_ORG: (state, org) => {
      state.org = org
    }
  },
  getters: {

    getHeadImgUrl: state => state.headImgUrl

  },
  actions: {
    // 用户登录
    loginByUserphone({ commit }, userInfo) {

      const userPhone = userInfo.userphone.trim()

      return new Promise((resolve, reject) => {

        loginByUserphone(userPhone, userInfo.password, userInfo.uuid, userInfo.captcha).then(response => {

          const datares = response.data
          // console.log(datares);
          if (datares.message != null && datares.retCode != null && datares.data == null) {
            Message(datares.message)

          } else {
            setToken(datares.data.token)
            commit('SET_TOKEN', datares.data.token)

            resolve()
          }

        }).catch(error => {

          reject(error)

        })
      })
    },
    // 获取用户部门树



    // 获取用户信息
    GetUserInfo({ commit, state }) {

      return new Promise((resolve, reject) => {

        getUserInfo(getToken()).then(response => {

          // console.log(getToken());

          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          localStorage.setItem('headUrl', data.data.headImgUrl)
          const roles = data.data.post.split(',')
          const datares = response.data.data.menu
          let res = []
          //  console.log(datares);
          // 子路由
          let arr = ['kefu', 'daizhang', 'gongshang', 'caiwu', 'message', 'shuiwu', 'weixin', 'kaoqin', 'shezhi', '', 'fenxi', 'zengzhi']
          for (var i = 0; i < datares.length; i++) {
            let name1 = datares[i].menuName
            let enname = datares[i].engName
            // console.log(arr[i]);

            let children = datares[i].children
            let fa = datares[i]

            let children2 = []

            for (var j = 0; j < children.length; j++) {

              let name5 = children[j].menuName
              let ennamez = children[j].engName


              children2.push({ path: enname + '/' + ennamez, component: _import('vyz/' + enname + '/' + ennamez), name: ennamez, meta: { title: ennamez } })
              // console.log(children2[1]);
              // console.log( datares[2].enName);
              // console.log(children2[0].name);
              // if(datares[2].enName='BusinessServices'){
              //   children2.push({path:enname +'/'+ennamez,component:_import('vyz/'+enname+'/'+ennamez),name:ennamez,meta:{title: ennamez},icon: 'bug'})
              // }

            }
            if (enname == 'HomePage') {


              //todo 父级路由
            } else {
              //  console.log(enname);
              res.push({
                path: '/' + enname,
                component: Layout,
                name: enname,
                meta: {
                  title: enname,
                  icon: arr[i]
                },
                children: children2

              })
            }


          }

          res.push({
            path: '/dashboardacc',
            component: Layoutacc,
            name: 'dashboardacc',
            meta: {
              title: 'dashboardacc',
              icon: 'example'
            },
            hidden: true,
            children: [{
              path: 'dashboardacc',
              component: _import('dashboardacc/index'),
              name: 'dashboardacc',
              meta: { title: 'dashboardacc', icon: 'dashboard', noCache: true }
            }]
          })





          const zdatares = response.data.data.menuVo


          let zres = []

          let newArr = ['null', 'null', 'laptop', 'null', 'search', 'sticker', 'list-view', 'grid', 'diamond', 'settings', 'null']
          let showArr = [true, true, true, true, true, true, true, true, true, true, false]
          if (zdatares) {
            for (var i = 0; i < zdatares.length; i++) {
              let zname1z = zdatares[i].menuName
              let zenname = zdatares[i].engName

              let zchildren = zdatares[i].children
              // console.log(zname1z)
              // console.log(zenname)
              let zchildren2 = []
              if (zenname == "Salary") {
                zchildren = []
                zchildren2.push({ path: zenname + '/' + zenname, component: _import('acc/' + zenname + '/index'), name: zenname, meta: { title: zenname, icon: 'credit-card', } })
              } else if (zenname == "EnteringVoucher") {
                zchildren2.push({ path: zenname + '/' + zenname, component: _import('acc/' + zenname + '/index'), name: zenname, meta: { title: zenname, icon: 'calendar-add', } })
              } else if (zenname == "SettleAccounts") {//结账
                zchildren2.push({ path: zenname + '/' + zenname, component: _import('acc/' + zenname + '/index'), name: zenname, meta: { title: zenname, icon: 'checkbox', } })
              } else if (zenname == "Print") {
                zchildren2.push({ path: zenname + '/' + zenname, component: _import('acc/' + zenname + '/index'), name: zenname, meta: { title: zenname, icon: 'null', } })
              } else if (zenname == "CardSetup") {
                zchildren2.push({ path: zenname + '/' + zenname, component: _import('acc/' + zenname + '/index'), name: zenname, meta: { title: zenname, icon: 'null', } })
              }
              else {

                for (var j = 0; j < zchildren.length; j++) {
                  let zname5 = zchildren[j].menuName
                  let zennamez = zchildren[j].engName
                  if (zchildren[j].engName == 'Voucher') {
                    zchildren2.push({ path: zenname + '/' + zennamez, component: _import('acc/' + zenname + '/' + zennamez), name: zennamez, meta: { title: zennamez, icon: 'search', showed: false } })

                  } else
                    zchildren2.push({ path: zenname + '/' + zennamez, component: _import('acc/' + zenname + '/' + zennamez), name: zennamez, meta: { title: zennamez, icon: 'search', showed: true } })





                }

              }


              // console.log(i, 'i')
              // console.log(newArr[i], 'newArr')
              // console.log(j);
              zres.push({
                path: '/' + zenname,
                component: Layoutacc,
                name: zenname,

                meta: {
                  title: zenname,
                  icon: newArr[i],
                  showed: showArr[i]
                },
                children: zchildren2

              })

              res.push({
                path: '/' + zenname,
                component: Layoutacc,
                name: zenname,
                hidden: true,
                meta: {
                  title: zenname,
                  icon: 'example'
                },
                children: zchildren2

              })


            }
          }





          // console.log(zres)
          // console.log(res)
          // console.log(state.routers2)
          commit('SET_ROLES', roles)
          commit('SET_PHONE', data.data.phone)
          commit('SET_ID', data.data.id)
          commit('SET_NAME', data.data.userName)
          commit('SET_ROUTERS', res)
          commit('SET_ROUTERS2', zres)
          commit('SET_HEAD_URL', data.data.headImgUrl)
          commit('SET_ORG', data.data.org)
          resolve(response)



        }).catch(error => {
          reject(error)
        })


      })
    },




    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },


    // 登出
    LogOut({ commit, state }) {

      Message("您已退出")
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          // commit('SET_ROLES', [] 
          removeToken()
          resolve()

        }).catch(error => {
          reject(error)
        })
      })
    },


    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // ,

    // // 动态修改权限
    // ChangeRoles({ commit }, role) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', role)
    //     setToken(role)
    //     getUserInfo(role).then(response => {
    //       const data = response.data
    //       const rol={'a':11111}

    //       commit('SET_ROLES',rol)

    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       commit('SET_INTRODUCTION', data.introduction)
    //       resolve()
    //     })
    //   }
    //   )
    // }
    // 获取账套时间和客户信息
    getCustomData({ commit, state }) {
      getPeriod().then(res => {
        let year = res.data.data && res.data.data.substr(0, 4)
        let mouth = res.data.data && res.data.data.substr(5, 2).replace(/^[0]/g, "")
        const nu = `${year}年第${mouth}期`
        const nus = `${year}年${mouth}期`
        commit('SET_PERIOD', res.data.data)
        commit('SET_NUMBEROFPERIODS', nu)
        commit('SET_NOFPERIODS', nus)
      })
      getData().then(res => {
        commit('SET_CUSTOMDATA', res.data.data)
      })
    }
  }
}

export default user
