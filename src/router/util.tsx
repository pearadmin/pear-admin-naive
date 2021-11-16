import type { MenuOption } from 'naive-ui'
import { RouteRecordRaw } from 'vue-router'
const menuRoutes = import.meta.globEager('./modules/*/*.ts')

const routes = Object.keys(menuRoutes).reduce((routes, key) => {
  const module = menuRoutes[key].default
  return [...routes, ...module]
}, [] as RouteRecordRaw[])

export type LoadRoutesType = 'backed' | 'frontend'

export function getRoutes(type: LoadRoutesType = 'frontend'): RouteRecordRaw[] {
  if (type === 'frontend') {
    // return Promise.resolve(routes)
    return routes
  }
  return []
  // return Promise.resolve([])
}

export function getMenuOptions(routes: RouteRecordRaw[]): MenuOption[] {
  const menuOptions: MenuOption[] = []
  routes.forEach((route) => {
    if (!route.meta?.hidden) {
      const menuOption: MenuOption = {
        label: route.meta?.title,
        icon: route.meta?.icon
          ? () => {
              return <span>{route.meta?.icon}</span>
            }
          : undefined,
        key: route.name as string
      }
      if (route.children && route.children.length > 0) {
        menuOption.children = getMenuOptions(route.children)
      }
      menuOptions.push(menuOption)
    }
  })
  return menuOptions
}
