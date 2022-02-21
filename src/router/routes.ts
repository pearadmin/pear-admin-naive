import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.ts')

const routes = Object.keys(modules).reduce((routes, key) => {
  const module = modules[key].default
  if (Array.isArray(module)) {
    return [...routes, ...module]
  } else {
    return [...routes, ...module.routes]
  }
}, [] as RouteRecordRaw[])

export default routes
