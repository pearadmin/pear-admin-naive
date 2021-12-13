import { provide, Ref, ref, watch } from 'vue'
import { merge } from 'lodash-es'
import { useBreakPoint } from '@/composables/useBreakPoint'
import { BREAK_POINT_SIZE } from '@/enums/breakPointEnum'

export const layoutConfigInjectKey = Symbol('layoutConfig')
export const updLayoutConfigInjectKey = Symbol('updLayoutConfig')

export interface LayoutConfig {
  collapsed: boolean
  isMobile: boolean
}

export function createLayoutContext() {
  const { device } = useBreakPoint()

  const config = ref<LayoutConfig>({
    collapsed: device.width < BREAK_POINT_SIZE.md,
    isMobile: device.width < BREAK_POINT_SIZE.md
  })

  watch(
    () => device.width,
    (w) => {
      config.value = {
        collapsed: w < BREAK_POINT_SIZE.md,
        isMobile: w < BREAK_POINT_SIZE.md
      }
    },
    { immediate: true }
  )

  watch(config, (cfg) => {
    console.log(cfg)
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
