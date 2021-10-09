import { createWebHashHistory, createRouter } from 'vue-router'
import { App } from 'vue'
import { permissionGuard } from '@/router/guard/permissionGuard'
import { BasicLayout } from '@/layouts'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: BasicLayout,
      redirect: '/dashboard/index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/dashboard/index.vue'),
          name: 'Index'
        }
      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/test/index.vue')
    }
  ]
})

permissionGuard(router)

export const setupRouter = (app: App<Element>): void => {
  app.use(router)
}
