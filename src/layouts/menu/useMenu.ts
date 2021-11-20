import { getRoutes, getMenuOptions } from '@/router/util'
import { Ref, ref, watch } from 'vue'
import { MenuOption } from 'naive-ui'
import { useRoute } from 'vue-router'

export interface ReturnUseMenu {
  menuRef: Ref<MenuOption[]>
  expandKeys: Ref<string[]>
  updateExpandKeys: (keys: string[]) => void
  currentMenu: Ref<string>
  updateValue: (key: string) => void
}

export function useMenu(): ReturnUseMenu {
  const menuRef = ref<MenuOption[]>([])
  const routes = getRoutes()
  const menus = getMenuOptions(routes)
  menuRef.value = menus

  const route = useRoute()

  const expandKeys = ref<string[]>([])
  const currentMenu = ref<string>('')

  // 初始化加载
  watch(
    () => route.path,
    () => {
      setKeys()
    },
    { immediate: true }
  )

  function setKeys() {
    const matched = route.matched
    const matchedNames = matched.map((it) => it.name as string)
    const [expandKey, openKey] = matchedNames
    expandKeys.value = Array.of(expandKey)
    currentMenu.value = openKey
  }

  // 展开收起
  function updateExpandKeys(keys: string[]) {
    expandKeys.value = keys
  }

  // 选中的菜单
  function updateValue(key: string) {
    currentMenu.value = key
  }

  return {
    menuRef,
    expandKeys,
    updateExpandKeys,
    currentMenu,
    updateValue
  }
}
