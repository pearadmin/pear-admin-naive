import { defineStore } from 'pinia'
import type { GlobalTheme } from 'naive-ui'
import { useLocalStorage } from '@vueuse/core'
import { RemoveableRef } from '@vueuse/core'

export type ThemeName = 'dark' | 'light' | 'auto'
export interface AppConfiguration {
  theme: RemoveableRef<ThemeName>
}
export type GetTheme = Nullable<GlobalTheme>

const useAppStore = defineStore({
  id: 'app',
  state: (): AppConfiguration => {
    return <AppConfiguration>{
      theme: useLocalStorage('theme', 'dark')
    }
  },
  getters: {},
  actions: {
    toggleTheme(theme: ThemeName) {
      this.theme = theme
      localStorage.setItem('theme', theme)
    }
  }
})

export { useAppStore }
