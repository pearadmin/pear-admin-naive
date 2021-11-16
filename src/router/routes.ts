import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.ts')

const routes = Object.keys(modules).reduce((routes, key) => {
  const module = modules[key].default
  return [...routes, ...module]
}, [] as RouteRecordRaw[])

export default routes
