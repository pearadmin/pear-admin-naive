import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

const topRoutes: RouteRecordRaw[] = [
  {
    path: '/topLevel',
    name: 'TopLevel',
    component: BasicLayout,
    meta: {
      title: '顶级菜单',
      icon: 'entypo:tools',
      hiddenChildren: true
    },
    children: [
      {
        path: 'topIndex',
        name: 'TopIndex',
        component: () => import('@/views/demo/top-level/index.vue'),
        meta: {
          title: '顶级菜单1',
          icon: 'entypo:tools'
        }
      },
      {
        path: 'topIndex2',
        name: 'TopIndex2',
        component: () => import('@/views/demo/top-level/index2.vue'),
        meta: {
          title: '顶级菜单2',
          icon: 'entypo:tools'
        }
      }
    ]
  }
]

export default {
  sort: 7,
  routes: topRoutes
}
