import type { Router } from 'vue-router'
import { useUserStore } from '@/store/modules/userInfo'
import { unref } from 'vue'

export function permissionGuard(router: Router): void {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const token = unref(userStore.token)
    if (!token) {
      if (to.name === 'Login') {
        next()
      } else {
        next('/login')
      }
    } else {
      if (to.name === 'Login') {
        next('/dashboard')
      } else {
        next()
      }
    }
  })
}
