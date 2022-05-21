import { getMenuOptions } from '@/router/util'
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/userInfo'

export interface ReturnUseMenu {
  menuRef: Ref<MenuOption[]>
  expandKeys: Ref<string[]>
  updateExpandKeys: (keys: string[]) => void
  currentMenu: Ref<string>
  updateValue: (key: string) => void
}

export function useMenu(): ReturnUseMenu {
  const userStore = useUserStore()
  const menuRef = ref<MenuOption[]>([])

  const routes = computed(() => {
    return userStore.menuRoutes
  })

  const menus = getMenuOptions(routes.value)

  // @ts-ignore
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
    const matchLen = matchedNames.length
    const matchExpandKeys = matchedNames.slice(0, matchLen - 1)
    const openKey = matchedNames[matchLen - 1]
    expandKeys.value = matchExpandKeys
    // 处理平级模式的菜单
    if (route?.meta?.activeMenuName) {
      currentMenu.value = route.meta.activeMenuName as string
    } else {
      currentMenu.value = openKey
    }
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
