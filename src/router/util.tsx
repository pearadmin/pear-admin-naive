import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'
import Icon from '@/components/Icon/Icon.vue'

export function getMenuOptions(routes: RouteRecordRaw[]): MenuOption[] {
  let menuOptions: MenuOption[] = []
  routes.forEach((route) => {
    if (!route.meta?.hidden) {
      if (route.meta?.hiddenChildren) {
        const children = getMenuOptions(route.children || [])
        menuOptions = [...menuOptions, ...children]
      } else {
        const menuOption: MenuOption = {
          label: () => {
            if (route.children && Array.isArray(route.children)) {
              return route.meta?.title
            } else {
              return <router-link to={{ name: route.name }}>{route.meta?.title}</router-link>
            }
          },
          icon: route.meta?.icon
            ? () => {
                return <Icon name={route.meta?.icon as string} />
              }
            : undefined,
          key: route.name as string
        }
        if (route.children && route.children.length > 0) {
          menuOption.children = getMenuOptions(route.children)
        }
        menuOptions.push(menuOption)
      }
    }
  })
  return menuOptions
}
