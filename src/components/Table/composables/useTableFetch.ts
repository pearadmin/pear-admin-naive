// @ts-ignore
import type { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { computed, nextTick, Ref, ref, unref, UnwrapRef, watch } from 'vue'
import { useApi } from '@/api/http'
import { PaginationProps } from 'naive-ui'
import { DEFAULT_TABLE_FETCH, TABLE_FETCH_RESPONSE, TABLE_PAGINATION } from '@/config'
import { FetchMethod } from '@/api/http/composables/useApi'
import { isEqual } from 'lodash-es'

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
  const tableData = ref<Recordable[]>([])

  const fetchOptions = computed((): Recordable => {
    const basic = {
      [TABLE_PAGINATION.pageNo]: paginationRef.value.page,
      [TABLE_PAGINATION.pageSize]: paginationRef.value.pageSize
    }
    let userOptions: Recordable = {}
    if (props.fetch && props.fetch.beforeFetch && typeof props.fetch.beforeFetch === 'function') {
      userOptions = props.fetch.beforeFetch(basic) ?? {}
    }
    return {
      ...basic,
      ...userOptions
    }
  })

  const {
    loading: isFetching,
    executor: fetchRunner,
    finished: fetchFinished,
    data
  } = useApi<Recordable>(
    {
      url: props.fetch?.fetchUrl as string,
      // ...fetchOptions.value
      method: DEFAULT_TABLE_FETCH.method as FetchMethod,
      [DEFAULT_TABLE_FETCH.bodyType]: fetchOptions
    },
    { immediate: false, redo: false }
  )

  watch(fetchOptions, (n, o) => {
    if (!isEqual(n, o)) {
      if (props.fetch?.redo && props.fetch?.redo === true) {
        unref(fetchRunner)()
      }
    }
  })

  if (props.fetch?.immediate === undefined || props.fetch?.immediate === true) {
    // 初次执行在下一个事件中执行，保证fetch options 已经加载完成
    nextTick().then(() => {
      unref(fetchRunner)()
    })
  }

  watch(
    data,
    (res) => {
      if (res) {
        // table data
        let cacheData = res?.[TABLE_FETCH_RESPONSE.list] ?? []
        if (props.fetch?.afterFetch && typeof props.fetch?.afterFetch === 'function') {
          cacheData = props.fetch.afterFetch(cacheData) ?? []
        }
        tableData.value = cacheData
        // pagination
        paginationRef.value.itemCount = res?.[TABLE_FETCH_RESPONSE.total]
      }
    },
    { immediate: true, deep: true }
  )

  return {
    isFetching,
    fetchFinished,
    tableData,
    fetchRunner
  }
}
