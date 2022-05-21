import { createWebHashHistory, createRouter } from 'vue-router'
import type { App } from 'vue'
import routes from './routes'
import { useAppRouterGuard } from '@/router/guard'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

useAppRouterGuard(router)

export const useAppRouter = (app: App<Element>): void => {
  app.use(router)
}
