// @ts-ignore
import { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { computed, ComputedRef, Ref, ref, UnwrapRef, watch } from 'vue'
import { useApi } from '@/api/http'
import { PaginationProps } from 'naive-ui'
import { UseApiReturnType } from '@/api/http/type'

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

  const useFetchFn = computed(() => {
    if (fetchConfig.value && fetchConfig.value.fetchUrl) {
      return (): UseApiReturnType<unknown> => {
        return useApi<unknown>(
          fetchConfig.value?.fetchUrl,
          { method: 'get' },
          { immediate: fetchConfig.value?.immediate ?? true }
        )
      }
    }
    return null
  })

  const { loading, execute, finished, data } = useFetchFn.value?.() as UseApiReturnType<unknown>

  // onMounted(() => {
  //   if (fetchConfig.value && !fetchConfig.value.immediate) {
  //     execute.value()
  //   }
  // })

  return {
    isFetching: loading,
    fetchRunner: execute,
    fetchFinished: finished,
    tableData: data
  }
}
