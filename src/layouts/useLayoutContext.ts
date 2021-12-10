import { inject, Ref } from 'vue'
import {
  LayoutConfig,
  layoutConfigInjectKey,
  updLayoutConfigInjectKey
} from '@/layouts/createLayoutContext'

export function useLayoutContext() {
  const layoutConfig = inject(layoutConfigInjectKey) as Ref<LayoutConfig>
  const updLayoutConfig = inject(updLayoutConfigInjectKey) as (upd: Partial<LayoutConfig>) => void

  return {
    layoutConfig,
    updLayoutConfig
  }
}
