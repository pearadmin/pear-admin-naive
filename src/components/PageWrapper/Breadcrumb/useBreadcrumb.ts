import { useRoute } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'
import { ref, watch } from 'vue'

export default function useBreadcrumb() {
  const route = useRoute()

  const matches = ref<RouteLocationMatched[]>([])

  watch(
    () => route.path,
    () => {
      matches.value = [...route.matched]
    },
    { immediate: true }
  )

  return {
    matches
  }
}
