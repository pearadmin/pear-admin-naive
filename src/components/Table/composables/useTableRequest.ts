import { computed, ComputedRef, nextTick, onMounted, ref, Ref, watch, watchEffect } from 'vue'
import { PaginationProps } from 'naive-ui'
import { Recordable } from 'vite-plugin-mock'
import { DEFAULT_TABLE_FETCH, TABLE_FETCH_RESPONSE, TABLE_PAGINATION } from '@/config'
import { get, set } from '@vueuse/core'
// @ts-ignore
import { PearTableProps } from '@/components/Table/components/PearTable.vue'
import { useApi } from '@/api/http'
import { FetchMethod } from '@/api/http/composables/useApi'
import { isFunction, merge } from 'lodash-es'

export interface UseTableRequestOptions {
  pagination: Ref<Partial<PaginationProps>>
  fetchParams: Ref<Recordable>
  props: ComputedRef<PearTableProps>
}
export function useTableRequest(options: UseTableRequestOptions) {
  // 请求结果
  const result = ref<Recordable[]>([])
  // url
  const fetchUrl = computed((): string => {
    return (get(options.props).fetch?.fetchUrl as string) ?? ''
  })
  // fetch options
  const fetchOptions = ref<Recordable>({})

  // basic request options
  const basicParams = computed((): Recordable => {
    return {
      [TABLE_PAGINATION.pageNo]: get(options.pagination, 'page'),
      [TABLE_PAGINATION.pageSize]: get(options.pagination, 'pageSize'),
      ...get(options.fetchParams)
    }
  })

  watchEffect(() => {
    const before = get(options.props).fetch?.beforeFetch ?? null
    let userParams = {}
    if (before && isFunction(before)) {
      userParams = before.call(null, basicParams)
    }
    fetchOptions.value = merge({}, get(basicParams), get(userParams))
  })

  const { loading, executor, finished, data } = useApi<Recordable>(
    {
      url: fetchUrl,
      method: DEFAULT_TABLE_FETCH.method as FetchMethod,
      [DEFAULT_TABLE_FETCH.bodyType]: fetchOptions
    },
    {
      immediate: false,
      redo: false
    }
  )

  onMounted(async () => {
    await nextTick()
    const immediate = get(options.props).fetch?.immediate ?? true
    if (immediate) {
      await get(executor)()
    }
  })

  watch(
    [() => options.pagination.value.page, () => options.pagination.value.pageSize],
    ([cPage, cSize], [oPage, oSize]) => {
      if (cPage !== oPage || cSize !== oSize) {
        get(executor)()
      }
    }
  )

  watchEffect(() => {
    if (data.value) {
      result.value = []
      let cacheData = get(data)?.[TABLE_FETCH_RESPONSE.list] ?? []
      const after = get(options.props).fetch?.afterFetch ?? null
      if (after && isFunction(after)) {
        cacheData = after.call(null, data) ?? []
      }
      result.value = cacheData
      // pagination
      set(options.pagination.value, 'itemCount', get(data)?.[TABLE_FETCH_RESPONSE.total])
    }
  })

  return {
    loading,
    data: result,
    executor,
    finished
  }
}
