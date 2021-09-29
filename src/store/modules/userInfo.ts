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
      userInfo: null,
      token: null
    }
  },
  getters: {},
  actions: {
    setUserInfo(userInfo: Recordable) {
      const userInfoRef = useStorage('userInfo', userInfo, localStorage)
      userInfoRef.value = userInfo
      this.userInfo = userInfoRef.value
    },
    setToken(token: string) {
      const tokenRef = useStorage('token', token, localStorage)
      tokenRef.value = token
      this.token = tokenRef.value
    }
  }
})

export { useUserStore }
