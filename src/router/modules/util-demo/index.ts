import { RouteRecordRaw } from 'vue-router'
import { getParentComponent, BasicLayout } from '@/layouts'

const utilDemoRoutes: RouteRecordRaw[] = [
  {
    path: '/utils',
    name: 'Utils',
    component: BasicLayout,
    meta: {
      title: '工具案例',
      icon: 'entypo:tools',
    },
    redirect: '/utils/http',
    children: [
      {
        path: 'http',
        name: 'Http',
        component: getParentComponent('parentHttp'),
        meta: {
          title: '请求工具',
          icon: 'simple-icons:farfetch'
        },
        redirect: '/utils/http/topAwait',
        children: [
          {
            path: 'topAwait',
            name: 'TopAwait',
            component: () => import('@/views/demo/utils-demo/http/topAwait.vue'),
            meta: {
              title: '顶级请求',
              icon: 'fluent:desktop-flow-20-regular'
            }
          },
          {
            path: 'pageFetch',
            name: 'PageFetch',
            meta: {
              title: '页面请求',
              icon: 'simple-icons:farfetch'
            },
            component: () => import('@/views/demo/utils-demo/http/index.vue'),
          }
        ]
      }
    ]
  }
]

export default utilDemoRoutes
