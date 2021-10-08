import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

interface UserState {
  userInfo: Nullable<Recordable>
  token: Nullable<string>
}

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => {
    return {
      userInfo: useStorage('userInfo', null, sessionStorage).value,
      token: useStorage('token', null, sessionStorage).value
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
    }
  }
})

export { useUserStore }
