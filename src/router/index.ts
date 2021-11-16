import { createWebHashHistory, createRouter } from 'vue-router'
import { App } from 'vue'
import { permissionGuard } from '@/router/guard/permissionGuard'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

permissionGuard(router)

export const setupRouter = (app: App<Element>): void => {
  app.use(router)
}
