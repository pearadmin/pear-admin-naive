// @ts-ignore
import type { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { computed, Ref, ref, UnwrapRef, watch } from 'vue'
import { useApi } from '@/api/http'
import { PaginationProps } from 'naive-ui'
import { DEFAULT_TABLE_FETCH, TABLE_FETCH_RESPONSE, TABLE_PAGINATION } from '@/config'

export interface UseTableFetchReturn {
  isFetching: Ref<boolean>
  fetchFinished: Ref<boolean>
  fetchRunner: Ref<() => Promise<unknown>>
  tableData: Ref<UnwrapRef<unknown> | null>
}

export default function useTableFetch(
  props: Readonly<BasicTableProps>,
  paginationRef: Ref<PaginationProps>
): UseTableFetchReturn {
  const isFetching = ref<boolean>(false)
  const fetchFinished = ref<boolean>(false)
  const fetchRunner = ref<PromiseFn<unknown>>(() => Promise.resolve())
  const tableData = ref<Recordable[]>([])

  const fetchOptions = computed((): Recordable => {
    /**
     * {
     *   method: 'get' | 'post'
     *   data: params | params: params
     * }
     */
    const basic = {
      [TABLE_PAGINATION.pageNo]: paginationRef.value.page,
      [TABLE_PAGINATION.pageSize]: paginationRef.value.pageSize,
    }
    let userOptions: Recordable = {}
    if (props.fetch && props.fetch.beforeFetch && typeof props.fetch.beforeFetch === 'function') {
      userOptions = props.fetch.beforeFetch(basic) ?? {}
    }
    return {
      method: DEFAULT_TABLE_FETCH.method,
      [DEFAULT_TABLE_FETCH.bodyType]: {
        ...basic,
        ...userOptions
      }
    }
  })

  const fetchInstance = computed(() => {
    const { loading, executor, finished, data } = useApi<Recordable>(
      {
        url: props.fetch?.fetchUrl as string,
        ...fetchOptions.value
      },
      { immediate: props.fetch?.immediate ?? true, redo: true }
    )
    return {
      loading, executor, finished, data
    }
  })

  watch(fetchInstance, res => {
    isFetching.value = res.loading.value
    fetchFinished.value = res.finished.value
    fetchRunner.value = res.executor.value
    // table data
    let cacheData = res.data.value?.[TABLE_FETCH_RESPONSE.list] ?? []
    if (props.fetch?.afterFetch && typeof props.fetch?.afterFetch === 'function') {
      cacheData = props.fetch.afterFetch(cacheData) ?? []
    }
    tableData.value = cacheData
    // pagination
    paginationRef.value.itemCount = res.data.value?.[TABLE_FETCH_RESPONSE.total]
  }, { immediate: true, deep: true })

  return {
    isFetching,
    fetchFinished,
    tableData,
    fetchRunner
  }
}
