import type { RouteRecordRaw } from 'vue-router'
import NotFound from '@/components/Error/Error404.vue'

// 错误页面不在route tabs中展示
export const ErrorPageNames = ['NotFound', 'NotPermission']

const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    meta: {
      title: '404'
    },
    component: NotFound
  }
]

export default errorRoutes
