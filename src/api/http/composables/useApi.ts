import { computed, ref, watch } from 'vue'
import type { ComputedRef, Ref, UnwrapRef } from 'vue'
import type { RequestOptionsInit } from 'umi-request'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import { merge, omit } from 'lodash-es'
import request from '../fetch'
import { useDebounceFn } from '@vueuse/core'

export type FetchMethod = 'get' | 'post' | 'delete' | 'put' | 'patch' | 'head' | 'options' | 'rpc'

export interface UseApiOptions extends RequestOptionsInit {
  url: MaybeRef<string>
  method?: FetchMethod
  data?: MaybeRef<any>
  params?: MaybeRef<Recordable | URLSearchParams>
  showErrorType?: 'Message' | 'Dialog' | 'Notification'
}

export interface UseApiConfig<T = Nullable<Recordable>> {
  immediate?: boolean
  redo?: boolean
  initialData?: T
  throwErr?: boolean
  debounce?: number
}

export interface UseApiReturnType<T> {
  // data: Ref<UnwrapRef<T>>
  data: Ref<UnwrapRef<T | null>>
  loading: Ref<UnwrapRef<boolean>>
  finished: Ref<UnwrapRef<boolean>>
  error: Ref<UnwrapRef<unknown>>
  executor: ComputedRef<(args?: RequestOptionsInit) => Promise<T>>
}

export function useApi<T extends Recordable>(
  options: UseApiOptions,
  config?: UseApiConfig<T>
): UseApiReturnType<T> {
  let useConfig: UseApiConfig = {
    immediate: true,
    initialData: null,
    redo: false,
    throwErr: false,
    debounce: 0
  }

  if (config) {
    useConfig = { ...useConfig, ...config }
  }

  // http url
  const fetchUrl = computed((): string => {
    return get(options.url)
  })

  // http params
  const fetchOptions = computed((): RequestOptionsInit => {
    return {
      ...omit(options, 'data', 'params', 'url', 'method'),
      data: get(options.data),
      params: get(options.params)
    }
  })

  // return define
  const data = ref<T>(useConfig.initialData as T)
  const loading = ref<boolean>(false)
  const finished = ref<boolean>(false)
  const error = ref<unknown>(null)

  const executor = computed((): ((args?: RequestOptionsInit) => Promise<T>) => {
    return (args?: RequestOptionsInit) => {
      const method = options.method ?? 'get'
      return new Promise((resolve, reject) => {
        loading.value = true
        finished.value = false
        data.value = null
        error.value = null
        const requestOption = merge({}, fetchOptions.value, args)
        request[method](fetchUrl.value, requestOption)
          .then((response) => {
            data.value = response.data as T
            error.value = null
            resolve(response.data as T)
          })
          .catch((err) => {
            data.value = null
            error.value = err
            if (useConfig.throwErr) {
              throw err
            } else {
              reject(err)
              console.error('fetch fail => ', err)
            }
          })
          .finally(() => {
            loading.value = false
            finished.value = true
          })
      })
    }
  })

  const debouncedFn = useDebounceFn(async () => {
    await get(executor)()
  }, useConfig?.debounce)

  watch(
    [fetchUrl, fetchOptions],
    async () => {
      if (useConfig.redo) {
        if (useConfig.debounce && useConfig.debounce > 0) {
          await debouncedFn()
        } else {
          await get(executor)()
        }
      }
    },
    { deep: true }
  )

  if (useConfig.immediate) {
    get(executor)()
  }

  return {
    data,
    loading,
    finished,
    error,
    executor
  }
}
