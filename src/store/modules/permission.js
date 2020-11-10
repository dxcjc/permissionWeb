import { asyncRoutes, constantRoutes } from '@/router'
import {getRoutes} from "@/api/router";
import Layout from '@/layout'
import logger from "vuex/dist/logger";


/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  setRouter({commit}, roles) {
    return new Promise(async resolve => {
        let menuList=[]

          let {data} =await getRoutes({roles})
          menuList=menuList.concat(data.list)
          menuList = unique(menuList)
          console.log('这是后端的菜单数据',menuList,data);// 这是后端的菜单数据

        let menuRouters = [] //定义一个空数组，这个是用来装真正路由数据的
        function unique(arr) {
          const res = new Map();
          return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
        }
        //下面就要根据后端的菜单数据组装树型路由数据
        //先取出根节点，没有父pid的就是根节点
        menuList.forEach((m, i) => {
          if (m.fid === 0) {
            m.fullPath = '/' + m.path
            let module = {
              path: '/' + m.path,
              component: Layout,
              alwaysShow: true,
              name: m.title,
              redirect: '',
              meta: {id: m.id,icon: 'user', title: m.title, fullPath: '/' + m.path},
              children: [
              ]
            }
              menuRouters.push(module)
          }
        })

        //定义一个递归方法
        function convertTree(routers) {
          routers.forEach(r => {
            menuList.forEach((m, i) => {
              if (m.fid !==0 && m.fid === r.meta.id) {
                if (!r.children) r.children = []
                m.fullPath = r.meta.fullPath + '/' + m.path
                r.redirect = m.fullPath
                let menu = {
                  path: m.path,
                  name:m.title,
                  component: require('@/views' + r.meta.fullPath + '/' + m.path).default,
                  meta: {id: m.id, title: m.title,icon: 'user', fullPath: r.meta.fullPath + '/' + m.path},
                  children: [
                  ]
                }
                r.children.push(menu)
              }
            })
            if (r.children && r.isRoute) convertTree(r.children)
          })
        }

        convertTree(menuRouters)
        commit('SET_ROUTES', menuRouters)
        resolve(menuRouters)//用递归填充
        // router.addRoutes(menuRouters) //挂载到router
      }
    )

  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


