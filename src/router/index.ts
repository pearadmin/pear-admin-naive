import { createWebHashHistory, createRouter } from 'vue-router'
import { App } from 'vue'
import { permissionGuard } from '@/router/guard/permissionGuard'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

permissionGuard(router)

export const useAppRouter = (app: App<Element>): void => {
  router.isReady().then((args) => {
    console.log('ise Ready', args)
  })
  app.use(router)
}
