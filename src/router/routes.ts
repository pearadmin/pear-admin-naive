import { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./modules/**/*.ts')

const routes = Object.keys(modules).reduce((routes, key) => {
  const module = modules[key].default
  if (Array.isArray(module)) {
    return [...routes, ...module]
  } else {
    // return [...routes, ...module]
    return [...routes, ...module.routes]
  }
}, [] as RouteRecordRaw[])

// sort
// routeModules.sort((p, n) => p.sort - n.sort)

// get routes
// const routes = routeModules.map((it) => it.routes) as RouteRecordRaw[]
// console.log(routes)
export default routes
