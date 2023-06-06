import {asyncRouterMap,constantRouterMap } from '@/router'
import {menuByUserz} from '@/api/sysmenu'
import Layout from '../../views/layout/Layout'
const _import = require('../../router/_import_' + process.env.NODE_ENV)

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route)
 {
 
  if (route.meta && route.meta.roles) {
   
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
  
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) 
{

  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}


const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers   
      state.routers = constantRouterMap.concat(routers)
    }
   

  },
  actions: {

    
    GenerateRoutes({commit} ) 
    {
      return  new Promise(resolve => {
        let accessedRouters  = filterAsyncRouter(asyncRouterMap)
        commit('SET_ROUTERS', accessedRouters)  
        resolve()
      })
    },


    menuByUser({commit})
     {

      return new Promise((resolve, reject) => 
      {
    
        menuByUserz().then(response => {
         
          const datares = response.data
          
          console.log(datares)

          let res=[]
          for(var i=0;i<datares.length;i++){
            let name1=datares[i].menuName
            let enname=datares[i].engName

              let children=datares[i].children
              let children2=[]
              for(var j=0;j<children.length;j++)
              {
                let name5=children[j].menuName
                let ennamez=children[j].engName
                console.log(ennamez)
                let test='hj_custom'
                children2.push({path: enname +'/'+ennamez,component:_import('vyz/'+enname+'/'+ennamez),name:ennamez,meta:{title: ennamez, icon: 'example'}})
              }

            res.push({
              path: '/'+enname,
              component: Layout,
              name: enname,
              meta: {
                title: enname,
                icon: 'example'
              },
              children:children2
             
            })
          }

          console.log(res)
         // setToken(datares.data.token)
        //  commit('SET_TOKEN', datares.data.token)    
          
         let accessedRouters  = filterAsyncRouter(asyncRouterMap)
         console.log(accessedRouters)
          commit('SET_ROUTERS', res)  

          resolve()

          }).catch(error =>
           {
         
          reject(error)
           
        })
      })
    }


  }



}

export default permission
