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
      title: '系统设置',
      icon: 'ri:settings-4-line'
    },
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/demo/system/account/index.vue'),
        meta: {
          title: '账号管理',
          icon: 'ri:account-box-line'
        }
      },
      {
        path: 'menus',
        name: 'Menus',
        component: () => import('@/views/demo/system/menus/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'system-uicons:side-menu'
        }
      }
    ]
  }
]

export default systemRoutes
