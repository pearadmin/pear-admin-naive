import type { RouteRecordRaw } from 'vue-router'
// import { BasicLayout } from '@/layouts'

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layouts'),
    redirect: '/dashboard/analysis',
    meta: {
      title: '仪表盘'
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/demo/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页'
        }
      },
      {
        path: 'workspace',
        name: 'Workspace',
        component: () => import('@/views/demo/dashboard/workspace/index.vue'),
        meta: {
          title: '工作台'
        }
      }
    ]
  }
]

export default dashboardRoutes
