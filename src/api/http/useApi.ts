import api from './FetchRequest'
import { computed, ref, watch } from 'vue'
import { UseApiFetchOption, HookConfig, DefaultCreateFetchOptions } from '@/api/http/type'
import { Options } from 'ky/distribution/types/options'
import { get } from '@vueuse/core'

function getInitialRefData(initialData: unknown): unknown {
  if (initialData) {
    return initialData
  }
  return null
}

export function useApi(options: UseApiFetchOption, hookConfig?: HookConfig) {
  // init useApi settings
  const hookCfg: HookConfig = { immediate: true, refetch: false, throwOnFailed: false }
  if (hookConfig) {
    Object.assign(hookCfg, hookConfig)
  }

  const loading = ref<boolean>(false)
  const error = ref<string>('')
  const data = ref<unknown>(getInitialRefData(hookCfg.initialData))

  // eg: /api/get/:id url
  const fetchUrl = computed(() => {
    return get(options.url)
  })

  // fetch options
  const fetchOptions = computed((): DefaultCreateFetchOptions => {
    const fetchOpt: Options = {}
    if (options.data) {
      fetchOpt.json = get(options.data)
    }
    if (options.params) {
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
        api
          .request(url, options)
          .then((response) => {
            data.value = response
            resolve(response)
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
    execute
  }
}
