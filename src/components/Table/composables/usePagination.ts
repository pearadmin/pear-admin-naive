import type { PaginationProps } from 'naive-ui'
// @ts-ignore
import { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { computed, watch } from 'vue'

export default function usePagination (basicTableProps: Readonly<BasicTableProps>) {
  const useFetchApi = computed(() => {
    return basicTableProps?.api ? basicTableProps.api : null
  })

  watch(useFetchApi, (useFunc) => {
    if (useFunc && typeof useFunc === 'function') {
      const promiseFn = useFunc({})
    }
  })

}
