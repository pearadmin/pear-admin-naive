// @ts-ignore
import BasicTable, { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { DataTableProps } from 'naive-ui'
import { ref } from 'vue'

/**
 * 传递的是二次封装的组件的props, NTableData的props, 及Attrs
 */
export type UseTableOptions = Partial<BasicTableProps & DataTableProps & Recordable>

export function useTable(options: UseTableOptions) {
  const tableRefEl = ref<Nullable<typeof BasicTable>>(null)

  return {
    tableRefEl
  }
}
