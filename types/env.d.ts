declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare interface ImportMetaEnv {
  VITE_FETCH_PREFIX_URL: string
  // 更多环境变量...
}

