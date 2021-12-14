import { ref, watch } from 'vue'
import { useBreakPoint } from '@/composables/useBreakPoint'
import { BREAK_POINT_SIZE } from '@/enums/breakPointEnum'

export interface LayoutBreakPoint {
  collapsed: boolean
  isMobile: boolean
}

export function useLayoutBreakPoint() {
  const { device } = useBreakPoint()

  const config = ref<LayoutBreakPoint>({
    collapsed: device.width < BREAK_POINT_SIZE.lg,
    isMobile: device.width < BREAK_POINT_SIZE.lg
  })

  watch(
    () => device.width,
    (w) => {
      config.value = {
        collapsed: w < BREAK_POINT_SIZE.lg,
        isMobile: w < BREAK_POINT_SIZE.lg
      }
    },
    { immediate: true }
  )

  return {
    config
  }
}
