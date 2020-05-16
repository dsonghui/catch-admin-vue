/**
 * export component map
 */
export default {
  userLayout: () => import('@/layouts/UserLayout.vue'),
  basicLayout: () => import('@/layouts/BasicLayout.vue'),
  routeView: () => import('@/layouts/RouteView.vue'),
  blankLayout: () => import('@/layouts/BlankLayout.vue'),
  pageView: () => import('@/layouts/PageView.vue'),
  workplace: () => import('@/views/dashboard/Workplace.vue'),
  users: () => import('@/views/permissions/users/users.vue'),
  roles: () => import('@/views/permissions/roles/roles.vue'),
  rules: () => import('@/views/permissions/rules/rules.vue'),
  database: () => import('@/views/system/database/index.vue'),
  loginLog: () => import('@/views/system/log/login.vue'),
  operateLog: () => import('@/views/system/log/operate.vue'),
  attachment: () => import('@/views/system/attachments/index.vue'),
  departments: () => import('@/views/permissions/departments/departments.vue'),
  jobs: () => import('@/views/permissions/jobs/jobs.vue'),
  config: () => import('@/views/system/config/index.vue'),
  generate: () => import('@/views/system/generate/index.vue'),
  xiaoquIndex: () => import('@/views/xiaoqu/index'),
  IsEmptyPage: () => import('@/views/common/empty')
  // cms 配置
  // 分类
  // category: () => import('@/views/cms/category'),
  // 文章
  // article: () => import('@/views/cms/article'),
  // 友情链接
  // friendLink: () => import('@/views/cms/friendLink')
}
