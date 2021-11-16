import type { RouteRecordRaw } from 'vue-router'
// import { BasicLayout } from '@/layouts'

const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    // component: BasicLayout,
    component: () => import('@/layouts'),
    redirect: '/system/account',
    meta: {
      title: '系统设置'
    },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/demo/system/account/index.vue'),
        meta: {
          title: '账号管理'
        }
      },
      {
        path: 'menus',
        name: 'Menus',
        component: () => import('@/views/demo/system/menus/index.vue'),
        meta: {
          title: '账号管理'
        }
      }
    ]
  }
]

export default systemRoutes
