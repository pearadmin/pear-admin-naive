import { getRoutes, getMenuOptions } from '@/router/util'
import { ref } from 'vue'
import { MenuOption } from 'naive-ui'
export function useMenu () {
  const menuRef = ref<Nullable<MenuOption[]>>(null)
  const routes = getRoutes()

  const menus = getMenuOptions(routes)

  menuRef.value = menus
}
