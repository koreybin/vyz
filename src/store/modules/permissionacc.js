import { asyncACCMenuMap, constantRouterMapAcc } from '@/router/indexacc'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission2(roles, route) {

  if (route.meta && route.meta.roles) {

    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {

    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncACCMenuMap
 * @param roles
 */
function filterasyncACCMenuMap(asyncACCMenuMap, roles) {

  const accessedRouters = asyncACCMenuMap.filter(route => {
    if (hasPermission2(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterasyncACCMenuMap(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}


const permissionacc = {
  state: {
    routers2: constantRouterMapAcc,
    addRouters2: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers2) => {
      state.addRouters2 = routers2
      state.routers2 = constantRouterMapAcc.concat(routers2)
    }
  },
  actions: {


    GenerateRoutes2({ commit }, data) {


      return new Promise(resolve => {

        const { roles } = data
        let accessedRouters
        if (roles.indexOf('超级管理员') >= 0) {
          console.log('我是')
          accessedRouters = asyncACCMenuMap
        }
        else {
          accessedRouters = filterasyncACCMenuMap(asyncACCMenuMap, roles)
        }

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
  }



}

export default permissionacc
