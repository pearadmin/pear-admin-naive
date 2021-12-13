import { watch, reactive } from 'vue'
import { useEventListener } from '@vueuse/core'
import { BREAK_POINT_NAME, BREAK_POINT_SIZE } from '@/enums/breakPointEnum'

export interface Device {
  width: number
  screen: string
}

export function useBreakPoint() {
  const device: Device = reactive({
    width: getWindowInnerWith(),
    screen: BREAK_POINT_NAME.XXL
  })

  function getWindowInnerWith(): number {
    return document.body.clientWidth
  }

  useEventListener(
    'resize',
    () => {
      device.width = getWindowInnerWith()
    },
    { passive: true }
  )

  watch(
    () => device.width,
    (w) => {
      const enumKeys = Object.keys(BREAK_POINT_SIZE)
      if (BREAK_POINT_SIZE.xxl < w) {
        device.screen = BREAK_POINT_NAME.XXL
      } else {
        const current = enumKeys.find((key) => w < BREAK_POINT_SIZE[key])
        device.screen = current as string
      }
    },
    { immediate: true }
  )

  return {
    device
  }
}
