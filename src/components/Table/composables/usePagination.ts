import type { PaginationProps } from 'naive-ui'
import { ref } from 'vue'

export default function usePagination () {
  const paginationRef = ref<PaginationProps>({
    itemCount: 0,
    pageCount: 0,
    pageSize: 10,
    showQuickJumper: true,
    showSizePicker: true,
    pageSizes: [
      {
        label: '10/页',
        value: 10
      },
      {
        label: '20/页',
        value: 20,
      },
      {
        label: '30/页',
        value: 30
      },
      {
        label: '5000/页',
        value: 5000
      },
      {
        label: '50000/页',
        value: 50000
      },
      {
        label: '100000/页',
        value: 100000
      }
    ],
    'onUpdate:pageSize': (pageSize: number) => {
      changePageSize(pageSize)
    },
  })

  function changePageSize (pageSize: number) {
    paginationRef.value.pageSize = pageSize
  }

  return {
    paginationRef
  }
}
