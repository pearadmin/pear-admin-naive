// @ts-ignore
import type { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { computed, nextTick, Ref, ref, unref, UnwrapRef, watch, WritableComputedRef } from 'vue'
import { useApi } from '@/api/http'
import { PaginationProps } from 'naive-ui'
import { DEFAULT_TABLE_FETCH, TABLE_FETCH_RESPONSE, TABLE_PAGINATION } from '@/config'
import { FetchMethod } from '@/api/http/composables/useApi'
import { isEqual, merge } from 'lodash-es'
import { RequestOptionsInit } from 'umi-request'
import { get } from '@vueuse/core'

export interface UseTableFetchReturn {
  isFetching: Ref<boolean>
  fetchFinished: Ref<boolean>
  fetchRunner: Ref<(args?: RequestOptionsInit) => Promise<unknown>>
  tableData: Ref<UnwrapRef<unknown> | null>
}

export default function useTableFetch(
  props: Readonly<BasicTableProps>,
  paginationRef: Ref<PaginationProps>,
  searchFormValue: WritableComputedRef<Recordable>
): UseTableFetchReturn {
  const tableData = ref<Recordable[]>([])
  const isFetching = ref<boolean>(false)
  const fetchFinished = ref<boolean>(false)
  const fetchRunner = ref<PromiseFn>(() => Promise.resolve())

  const fetchOptions = computed((): Recordable => {
    const basic: Recordable = {
      [TABLE_PAGINATION.pageNo]: paginationRef.value.page,
      [TABLE_PAGINATION.pageSize]: paginationRef.value.pageSize
    }
    if (searchFormValue.value) {
      merge(basic, {
        ...get(searchFormValue)
      })
    }
    let userOptions: Recordable = {}
    // 用户使用beforeFetch改变参数
    if (props.fetch && props.fetch.beforeFetch && typeof props.fetch.beforeFetch === 'function') {
      userOptions = props.fetch.beforeFetch(basic) ?? {}
    }
    return {
      ...basic,
      ...userOptions
    }
  })

  // const {
  //   loading: isFetching,
  //   executor: fetchRunner,
  //   finished: fetchFinished,
  //   data
  // } = useApi<Recordable>(
  //   {
  //     url: props.fetch?.fetchUrl as string,
  //     method: DEFAULT_TABLE_FETCH.method as FetchMethod,
  //     [DEFAULT_TABLE_FETCH.bodyType]: fetchOptions
  //   },
  //   { immediate: false, redo: false }
  // )

  const fetchComputed = computed(() => {
    const { loading, executor, finished, data } = useApi<Recordable>(
      {
        url: props.fetch?.fetchUrl as string,
        method: DEFAULT_TABLE_FETCH.method as FetchMethod,
        [DEFAULT_TABLE_FETCH.bodyType]: fetchOptions
      },
      { immediate: false, redo: false }
    )
    return {
      loading,
      executor,
      finished,
      data
    }
  })

  watch(
    fetchComputed,
    (fc) => {
      isFetching.value = fc.loading.value
      fetchFinished.value = fc.finished.value
      fetchRunner.value = fc.executor.value
    },
    { immediate: true, deep: true }
  )

  watch(
    () => fetchComputed.value.data,
    (res) => {
      if (res.value) {
        let cacheData = res.value?.[TABLE_FETCH_RESPONSE.list] ?? []
        if (props.fetch?.afterFetch && typeof props.fetch?.afterFetch === 'function') {
          cacheData = props.fetch.afterFetch(cacheData) ?? []
        }
        tableData.value = cacheData
        // pagination
        paginationRef.value.itemCount = res.value?.[TABLE_FETCH_RESPONSE.total]
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  // 请求参数改变
  watch(fetchOptions, (n, o) => {
    if (!isEqual(n, o)) {
      if (props.fetch?.redo && props.fetch?.redo === true) {
        unref(fetchRunner)()
      }
    }
  })

  // 分页信息改变
  watch(
    [() => paginationRef.value.page, () => paginationRef.value.pageSize],
    ([np, ns], [op, os]) => {
      if (np !== op || ns !== os) {
        unref(fetchRunner)()
      }
    }
  )

  if (props.fetch?.immediate === undefined || props.fetch?.immediate === true) {
    // 初次执行在下一个事件中执行，保证fetch options 已经加载完成
    nextTick().then(() => {
      unref(fetchRunner)()
    })
  }

  return {
    isFetching,
    fetchFinished,
    tableData,
    fetchRunner
  }
}
