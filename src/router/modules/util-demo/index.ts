import type { RouteRecordRaw } from 'vue-router'
import { getParentComponent, BasicLayout } from '@/layouts'

const utilDemoRoutes: RouteRecordRaw[] = [
  {
    path: '/utils',
    name: 'Utils',
    component: BasicLayout,
    meta: {
      title: '工具案例',
      icon: 'ri:tools-line'
    },
    redirect: '/utils/http',
    children: [
      {
        path: 'http',
        name: 'Http',
        component: getParentComponent('parentHttp'),
        meta: {
          title: '请求工具',
          icon: 'ic:baseline-http'
        },
        redirect: '/utils/http/topAwait',
        children: [
          {
            path: 'topAwait',
            name: 'TopAwait',
            component: () => import('@/views/demo/utils-demo/http/topAwait.vue'),
            meta: {
              title: '顶层异步请求'
            }
          },
          {
            path: 'useApi',
            name: 'UseApi',
            meta: {
              title: 'useApi'
            },
            component: () => import('@/views/demo/utils-demo/http/useApiHooks.vue')
          }
        ]
      },
      {
        path: 'composable',
        name: 'Composable',
        component: getParentComponent('parentComposable'),
        redirect: '/utils/composable/usePromiseFn',
        meta: {
          title: 'Composable',
          icon: 'ic:baseline-webhook'
        },
        children: [
          {
            path: 'usePromiseFn',
            name: 'UsePromiseFn',
            meta: {
              title: 'usePromiseFn'
            },
            component: () => import('@/views/demo/utils-demo/composables/usePromiseFn.vue')
          }
        ]
      }
    ]
  }
]

export default {
  sort: 5,
  routes: utilDemoRoutes
}
