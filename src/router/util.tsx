import type { MenuOption } from 'naive-ui'
import { RouteRecordRaw } from 'vue-router'
import Icon from '@/components/Icon'
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
        label: () => {
          if (route.children && Array.isArray(route.children)) {
            return route.meta?.title
          } else {
            return <router-link to={{ name: route.name }}>{route.meta?.title}</router-link>
          }
        },
        icon: route.meta?.icon
          ? () => {
              return <Icon color="var(--primary-color)" name={route.meta?.icon as string} />
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
