import type { RouteRecordRaw } from 'vue-router'

const rootRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard/analysis'
  }
]

export default rootRoutes
