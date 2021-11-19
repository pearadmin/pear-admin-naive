import { getRoutes, getMenuOptions } from '@/router/util'
import { onMounted, ref } from 'vue'
import { MenuOption } from 'naive-ui'
import { useRoute } from 'vue-router'
export function useMenu () {
  const menuRef = ref<Nullable<MenuOption[]>>(null)
  const routes = getRoutes()
  const menus = getMenuOptions(routes)
  menuRef.value = menus

  const route = useRoute()

  const expandKeys = ref<string[]>([])
  const currentMenu = ref<string>('')

  // 初始化加载
  onMounted(() => {
    const matched = route.matched
    const matchedNames = matched.map(it => it.name as string)
    const [expandKey, openKey] = matchedNames
    console.log(expandKey, openKey)
    expandKeys.value = Array.of(expandKey)
    currentMenu.value = openKey
  })

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
