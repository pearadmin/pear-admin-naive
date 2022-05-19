import { permissionGuard } from '@/router/guard/permissionGuard'
import type { Router } from 'vue-router'

export function useAppRouterGuard(router: Router) {
  permissionGuard(router)
}
