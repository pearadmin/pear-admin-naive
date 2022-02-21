import type { PaginationProps } from 'naive-ui'
import type { Ref } from 'vue'
import { ref } from 'vue'

export interface UsePagination {
  paginationRef: Ref<PaginationProps>
  resetPagination: () => void
}

export default function usePagination(): UsePagination {
  const paginationRef = ref<Writeable<PaginationProps>>({
    itemCount: 0,
    // pageCount: 100,
    page: 1,
    pageSize: 10,
    pageSlot: 9,
    showQuickJumper: true,
    showSizePicker: true,
    pageSizes: [
      {
        label: '10/页',
        value: 10
      },
      {
        label: '20/页',
        value: 20
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
      }
    ],
    ['onUpdate:pageSize']: (pageSize: number) => {
      paginationRef.value.page = 1
      paginationRef.value.pageSize = pageSize
    },
    ['onUpdate:page']: (pageNo: number) => {
      paginationRef.value.page = pageNo
    },
    prefix: (pagination: PaginationProps) => {
      return `共${pagination.itemCount ?? 0}条数据`
    }
    // suffix: (pagination: PaginationProps) => {
    //   return `${pagination.page} / ${pagination.pageCount}`
    // }
  })

  function resetPagination() {
    paginationRef.value.page = 1
    paginationRef.value.pageSize = 10
  }

  return {
    paginationRef,
    resetPagination
  }
}
