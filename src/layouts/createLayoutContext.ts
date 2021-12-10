import { provide, Ref, ref } from 'vue'
import { merge } from 'lodash-es'

export const layoutConfigInjectKey = Symbol('layoutConfig')
export const updLayoutConfigInjectKey = Symbol('updLayoutConfig')

export interface LayoutConfig {
  collapsed: boolean
}

export function createLayoutContext() {
  const config = ref<LayoutConfig>({
    collapsed: false
  })

  function updConfig(upd: Partial<LayoutConfig>) {
    merge(config.value, upd)
  }

  provide<Ref<LayoutConfig>>(layoutConfigInjectKey, config)
  provide<(upd: Partial<LayoutConfig>) => void>(updLayoutConfigInjectKey, updConfig)

  return {
    config,
    updConfig
  }
}
