import { VNodeChild } from "vue";

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    hidden?: boolean
  }
}

declare interface ImportMetaEnv {
  VITE_FETCH_PREFIX_URL: string
  // 更多环境变量...
}

