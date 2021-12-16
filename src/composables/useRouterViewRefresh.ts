import { onUnmounted, ref, watch } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

export function useRouterViewRefresh() {
  const showView = ref<boolean>(true)

  const { start, stop } = useTimeoutFn(
    () => {
      showView.value = true
    },
    16,
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

  onUnmounted(() => {
    stop()
  })

  return {
    showView,
    refreshRouterView
  }
}
