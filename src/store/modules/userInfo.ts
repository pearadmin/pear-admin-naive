import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { RouteRecordRaw } from 'vue-router'

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
      menuRoutes: useStorage('userRoutes', [], sessionStorage).value,
    }
  },
  getters: {
  },
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
      const routes = Object.keys(menuRoutes).reduce((routes, key) => {
        const module = menuRoutes[key]?.default || {}
        return [...routes, ...module]
      }, [] as RouteRecordRaw[])
      userRoutes.value = routes
      this.menuRoutes = routes
    }
  }
})

export { useUserStore }
