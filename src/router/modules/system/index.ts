import type { RouteRecordRaw } from 'vue-router'
// import { BasicLayout } from '@/layouts'

const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    // component: BasicLayout,
    component: () => import('@/layouts'),
    redirect: '/system/user',
    meta: {
      title: '系统设置',
      icon: 'ri:settings-4-line'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/demo/system/account/index.vue'),
        meta: {
          title: '用户管理',
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
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/fast-api/role/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'uil:user-square'
        }
      }
    ]
  }
]

export default systemRoutes
