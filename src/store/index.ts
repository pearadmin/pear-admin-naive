import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function useAppStore(app: App<Element>): void {
  app.use(store)
}

export { store }
