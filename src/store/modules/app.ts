import { defineStore } from 'pinia'
import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import { RemoveableRef, get } from '@vueuse/core'

export type ThemeName = 'dark' | 'light' | 'auto'

export interface RouteTag {
  name: string
  path: string
  fullPath: string
  title: string
}

export interface AppConfiguration {
  theme: RemoveableRef<ThemeName>
  tags: RemoveableRef<RouteTag[]>
}

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
    addTag(tag: RouteTag) {
      const tagsRef: RemoveableRef<RouteTag[]> = useSessionStorage('tags', [])
      if (tagsRef.value.findIndex((it) => get(it, 'name') === get(tag, 'name')) < 0) {
        tagsRef.value.push(tag)
      }
      this.tags = tagsRef.value
    },
    removeTag(tag: RouteTag) {
      const tagsRef: RemoveableRef<RouteTag[]> = useSessionStorage('tags', [])
      const index = tagsRef.value.findIndex((it) => get(it, 'name') === get(tag, 'name'))
      if (index > -1) {
        tagsRef.value.splice(index, 1)
        this.tags = tagsRef.value
      }
    }
  }
})

export { useAppStore }
