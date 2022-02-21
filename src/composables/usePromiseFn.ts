import { computed, ref, watch } from 'vue'
import type { Ref, UnwrapRef } from 'vue'
import { get } from '@vueuse/core'
import type { MaybeRef } from '@vueuse/core'

export type FetchData = Recordable

export interface UsePromiseConfig {
  immediate?: boolean
  redo?: boolean
}

export interface UsePromiseFnReturn<T> {
  loading: Ref<boolean>
  data: Ref<Nullable<UnwrapRef<T>>>
  finished: Ref<boolean>
  error: Ref<unknown>
  executor: () => void
}

export default function usePromiseFn<T>(
  fn: (...args: any) => Promise<UnwrapRef<T>>,
  fetchData?: Nullable<MaybeRef<FetchData>>,
  config?: UsePromiseConfig
): UsePromiseFnReturn<T> {
  const loading = ref<boolean>(false)
  const data = ref<Nullable<T>>(null)
  const finished = ref<boolean>(false)
  const error = ref<unknown>(null)

  const fetchParams = computed((): Recordable | undefined => {
    if (fetchData) {
      return get(fetchData)
    }
    return undefined
  })

  const { immediate, redo } = config ? config : { immediate: true, redo: true }

  function runPromise() {
    if (loading.value) {
      return
    }
    loading.value = true
    finished.value = false

    const promiseFn = fetchParams.value ? fn(fetchParams.value) : fn()
    promiseFn
      .then((response: UnwrapRef<T>) => {
        data.value = response
        error.value = null
      })
      .catch((err) => {
        error.value = err
        data.value = null
      })
      .finally(() => {
        loading.value = false
        finished.value = true
      })
  }

  watch(
    fetchParams,
    () => {
      if (redo) {
        if (!loading.value) {
          runPromise()
        }
        return
      }
    },
    { deep: true }
  )

  if (immediate) {
    if (!loading.value) {
      runPromise()
    }
  }

  return {
    loading,
    data,
    finished,
    error,
    executor: runPromise
  }
}
