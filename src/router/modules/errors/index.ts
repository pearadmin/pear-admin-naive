import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts/index'

const errors: RouteRecordRaw[] = [
  {
    path: '/error',
    name: 'Error',
    meta: {
      title: '错误页面',
      icon: 'mi:circle-error'
    },
    component: BasicLayout,
    children: [
      {
        path: '/404',
        name: '404',
        meta: {
          title: '404'
        },
        component: () => import('@/views/error/404.vue')
      },
      {
        path: '/403',
        name: '403',
        meta: {
          title: '403'
        },
        component: () => import('@/views/error/403.vue')
      },
      {
        path: '/500',
        name: '500',
        meta: {
          title: '500'
        },
        component: () => import('@/views/error/500.vue')
      }
    ]
  }
]

export default {
  sort: 8,
  routes: errors
}
