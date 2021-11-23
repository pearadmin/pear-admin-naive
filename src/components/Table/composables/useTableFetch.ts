// @ts-ignore
import { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { computed, ComputedRef, Ref, ref, UnwrapRef, watch } from 'vue'
import { useApi } from '@/api/http'
import { PaginationProps } from 'naive-ui'
import { UseApiReturnType } from '@/api/http/type'
import { DEFAULT_TABLE_FETCH } from '@/config'

export interface UseTableFetchReturn {
  isFetching: Ref<boolean>
  fetchFinished: Ref<boolean>
  fetchRunner: ComputedRef<() => Promise<unknown>>
  tableData: Ref<UnwrapRef<unknown> | null>
}

export default function useTableFetch(
  props: Readonly<BasicTableProps>,
  paginationRef: Ref<PaginationProps>
): UseTableFetchReturn {
  const fetchConfig = ref<Nullable<Recordable>>(null)

  watch(
    () => props.fetch,
    (fetch) => {
      if (fetch) {
        fetchConfig.value = fetch
      }
    },
    { deep: true, immediate: true }
  )

  function runBeforeFetch () {
    const params: Recordable = {}
    if (fetchConfig.value && fetchConfig.value.beforeFetch && typeof fetchConfig.value.beforeFetch === 'function') {
      const beforeFetchResult = fetchConfig.value.beforeFetch(params)
      return beforeFetchResult
    }
    return null
  }

  const useFetchFn = computed(() => {
    if (fetchConfig.value && fetchConfig.value.fetchUrl) {
      return (): UseApiReturnType<unknown> => {
        const params = runBeforeFetch()
        /**
         * {
         *   method: 'get' | 'post'
         *   body: params | params: params
         * }
         */
        // const fetchOptions = {
        //   method: DEFAULT_TABLE_FETCH.method,
        //   // [DEFAULT_TABLE_FETCH.bodyType]: params ?? null
        // }
        return useApi<unknown>(
          fetchConfig.value?.fetchUrl,
          {
            method: 'get'
          },
          { immediate: fetchConfig.value?.immediate ?? true }
        )
      }
    }
    return null
  })

  const { loading, execute, finished, data } = useFetchFn.value?.() as UseApiReturnType<any>

  // onMounted(() => {
  //   if (fetchConfig.value && !fetchConfig.value.immediate) {
  //     execute.value()
  //   }
  // })

  watch(data, d => {
    console.log(d)
  })

  return {
    isFetching: loading,
    fetchRunner: execute,
    fetchFinished: finished,
    tableData: computed(() => {
      return data.value?.menu as Recordable[] || []
    })
  }
}
