import { defineStore } from 'pinia'
import type { GlobalTheme } from 'naive-ui'
import { useLocalStorage, useSessionStorage, useStorage } from '@vueuse/core'
import { RemoveableRef, get } from '@vueuse/core'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { unref } from 'vue'

export type ThemeName = 'dark' | 'light' | 'auto'
export interface AppConfiguration {
  theme: RemoveableRef<ThemeName>
  tags: RemoveableRef<RouteLocationNormalizedLoaded[]>
}
export type GetTheme = Nullable<GlobalTheme>

const useAppStore = defineStore({
  id: 'app',
  state: (): AppConfiguration => {
    return <AppConfiguration>{
      theme: useLocalStorage('theme', 'dark'),
      tags: useSessionStorage('tags', [])
    }
  },
  getters: {},
  actions: {
    toggleTheme(theme: ThemeName) {
      this.theme = theme
      localStorage.setItem('theme', theme)
    },
    addTag(tag: RouteLocationNormalizedLoaded) {
      const tagsRef: RemoveableRef<RouteLocationNormalizedLoaded[]> = useSessionStorage('tags', [])
      if (tagsRef.value.findIndex(it => get(it, 'name') === get(tag, 'name')) < 0) {
        tagsRef.value.push(tag)
      }
      this.tags = tagsRef.value
    },
    removeTag(tag: RouteLocationNormalizedLoaded) {
      const tagsRef: RemoveableRef<RouteLocationNormalizedLoaded[]> = useSessionStorage('tags', [])
      const index = tagsRef.value.findIndex(it => get(it, 'name') === get(tag, 'name'))
      if (index > -1) {
        tagsRef.value.splice(index, 1)
        this.tags = tagsRef.value
      }
    }
  }
})

export { useAppStore }
