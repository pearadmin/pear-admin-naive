import { createWebHashHistory, createRouter } from 'vue-router'
import { App } from 'vue'

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
    }
  ]
})

export const setupRouter = (app: App<Element>): void => {
  app.use(router)
}
