import { defineStore } from 'pinia'
import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import { get } from '@vueuse/core'
import type { RemoveableRef } from '@vueuse/core'
import { unref } from 'vue'

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
  keepAliveNames: string[]
}

const useAppStore = defineStore({
  id: 'app',
  state: (): AppConfiguration => {
    return <AppConfiguration>{
      theme: useLocalStorage('theme', 'dark'),
      tags: useSessionStorage('tags', []),
      keepAliveNames: []
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
    },
    closeLeftTag(currentName: string) {
      const tagsRef: RemoveableRef<RouteTag[]> = useSessionStorage('tags', [])
      if (unref(tagsRef).length === 0) {
        return
      }
      const index = unref(tagsRef).findIndex((it) => it.name === currentName)
      this.tags = unref(tagsRef).filter((it, idx) => index <= idx)
    },
    closeRightTag(currentName: string) {
      const tagsRef: RemoveableRef<RouteTag[]> = useSessionStorage('tags', [])
      if (unref(tagsRef).length === 0) {
        return
      }
      const index = unref(tagsRef).findIndex((it) => it.name === currentName)
      this.tags = unref(tagsRef).filter((it, idx) => idx <= index)
    },
    closeOtherTag(currentName: string) {
      const tagsRef: RemoveableRef<RouteTag[]> = useSessionStorage('tags', [])
      if (unref(tagsRef).length === 0) {
        return
      }
      this.tags = unref(tagsRef).filter((it) => it.name === currentName)
    },
    setKeepAliveNames(keys: string[]) {
      this.keepAliveNames = keys
    }
  }
})

export { useAppStore }
