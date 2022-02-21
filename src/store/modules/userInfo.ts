import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { RouteRecordRaw } from 'vue-router'

const menuRoutes = import.meta.globEager('../../router/modules/*/*.ts')

interface UserState {
  userInfo: Nullable<Recordable>
  token: Nullable<string>
  menuRoutes: RouteRecordRaw[]
}

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      userInfo: useStorage('userInfo', null, sessionStorage).value,
      token: useStorage('token', null, sessionStorage).value,
      menuRoutes: useStorage('userRoutes', [], sessionStorage).value
    }
  },
  getters: {},
  actions: {
    setUserInfo(userInfo: Recordable) {
      const userInfoRef = useStorage('userInfo', userInfo, sessionStorage)
      userInfoRef.value = userInfo
      this.userInfo = userInfoRef.value
    },
    setToken(token: string) {
      const tokenRef = useStorage('token', token, sessionStorage)
      tokenRef.value = token
      this.token = tokenRef.value
    },
    setUserMenuRoutes() {
      const userRoutes = useStorage<RouteRecordRaw[]>('userRoutes', [], sessionStorage)
      const routeModules = Object.keys(menuRoutes).reduce((routes, key) => {
        const module = menuRoutes[key]?.default || {}
        routes.push(module)
        return routes
      }, [] as any)
      routeModules.sort((p, n) => p.sort - n.sort)
      const routes = routeModules.map((it) => it.routes).flat()
      userRoutes.value = routes
      this.menuRoutes = routes
    }
  }
})

export { useUserStore }
