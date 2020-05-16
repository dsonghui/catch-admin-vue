// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace'
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login.vue')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home.vue')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404.vue')
  }

]
