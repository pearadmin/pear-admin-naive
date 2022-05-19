import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

const componentsRoutes: RouteRecordRaw[] = [
  {
    path: '/feature',
    name: 'Feature',
    component: BasicLayout,
    redirect: '/feature/keepAlive',
    meta: {
      title: '功能',
      icon: 'typcn:feather'
    },
    children: [
      {
        path: 'keepAlive',
        name: 'KeepAlive',
        component: () => import('@/views/demo/feature/keep-alive/index.vue'),
        meta: {
          title: 'KeepAlive',
          icon: 'ic:round-insert-drive-file',
          keepAlive: true
        }
      }
    ]
  }
]

export default {
  sort: 9,
  routes: componentsRoutes
}
