import type { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'

const componentsRoutes: RouteRecordRaw[] = [
  {
    path: '/components',
    name: 'Components',
    component: BasicLayout,
    redirect: '/components/antVG2',
    meta: {
      title: '组件',
      icon: 'icon-park-outline:components'
    },
    children: [
      {
        path: 'antVG2',
        name: 'AntVG2',
        component: () => import('@/views/demo/components/antvG2/index.vue'),
        meta: {
          title: 'AntV/G2',
          icon: 'octicon:graph'
        }
      }
    ]
  }
]

export default {
  sort: 4,
  routes: componentsRoutes
}
