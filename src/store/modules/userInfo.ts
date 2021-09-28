import { defineStore } from 'pinia'
import { RemoveableRef, useLocalStorage } from '@vueuse/core'

interface UserState {
  userInfo: Nullable<Recordable>
  token: Nullable<RemoveableRef<string>>
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
      this.userInfo = useLocalStorage('userInfo', userInfo)
    },
    setToken(token: string) {
      this.token = useLocalStorage('token', token) as RemoveableRef<string>
    }
  }
})

export { useUserStore }
