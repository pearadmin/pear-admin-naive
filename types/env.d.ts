declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<Recordable, Recordable, any>
  export default Component
}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    /// 菜单是否显示 默认true
    hidden?: boolean
    /// 将所有的子级渲染为一级菜单 默认false
    hiddenChildren?: boolean
    /// 指定平级菜单的Name，用于渲染菜单的选中状态
    activeMenuName?: string
  }
}

declare interface ImportMetaEnv {
  VITE_FETCH_PREFIX_URL: string
  // 更多环境变量...
}
