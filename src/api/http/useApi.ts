import api from './Fetch'
import { computed, ref, watch } from 'vue'
import { HookConfig, InstanceFetchConfig, UseApiReturnType } from '@/api/http/type'
import { get, MaybeRef } from '@vueuse/core'

function getInitialRefData<T>(config: HookConfig<T>): T | null {
  if (config && config.initialData) {
    return get(config.initialData)
  }
  return null
}

export function useApi<T = any>(
  url: MaybeRef<string>,
  options?: InstanceFetchConfig,
  hookConfig?: HookConfig<T>
): UseApiReturnType<T> {
  // init useApi settings
  const hookCfg: HookConfig<T> = { immediate: true, refetch: false, throwOnFailed: false }
  if (hookConfig) {
    Object.assign(hookCfg, hookConfig)
  }

  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const data = ref<Nullable<T>>(getInitialRefData(hookCfg))
  // const data = ref<Nullable<T>>(null)
  const finished = ref<boolean>(false)

  // eg: /api/get/:id
  const fetchUrl = computed(() => {
    return get(url)
  })

  // fetch options
  const fetchOptions = computed((): InstanceFetchConfig => {
    const fetchOpt: InstanceFetchConfig = options ?? {}
    if (options && options.data) {
      fetchOpt.json = get(options.data)
    }
    if (options && options.params) {
      fetchOpt.searchParams = get(options.params)
    }
    return fetchOpt
  })

  // request entity
  const execute = computed(() => {
    const url = get(fetchUrl)
    const options = get(fetchOptions)
    return function () {
      return new Promise((resolve, reject) => {
        loading.value = true
        finished.value = false
        api
          .request(url, options)
          .then((response) => {
            data.value = response.data
            resolve(response.data)
          })
          .catch((fetchError) => {
            error.value = fetchError.message || fetchError.name
            if (hookCfg.throwOnFailed) {
              reject(fetchError)
            } else {
              resolve(undefined)
            }
          })
          .finally(() => {
            loading.value = false
            finished.value = true
          })
      })
    }
  })

  if (hookCfg.immediate) {
    get(execute)()
  }

  watch(
    [() => fetchOptions, () => fetchUrl],
    () => {
      if (hookCfg.refetch) {
        get(execute)()
      }
    },
    { deep: true }
  )

  return {
    loading,
    data,
    execute,
    finished
  }
}
