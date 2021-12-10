import { onUnmounted, provide, Ref, ref, watch } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

export const refreshInjectKey = Symbol('refreshInjectKey')
export const handleRefreshInjectKey = Symbol('handleRefreshInjectKey')

export function useRouterViewRefresh() {
  const showView = ref<boolean>(true)

  const { start, stop } = useTimeoutFn(
    () => {
      showView.value = true
    },
    60,
    { immediate: false }
  )

  watch(showView, (val) => {
    if (!val) {
      start()
    }
  })

  function refreshRouterView() {
    showView.value = false
  }

  provide<Ref<boolean>>(refreshInjectKey, showView)
  provide<() => void>(handleRefreshInjectKey, refreshRouterView)

  onUnmounted(() => {
    stop()
  })
}
