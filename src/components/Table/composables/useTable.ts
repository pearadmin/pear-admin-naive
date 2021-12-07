// @ts-ignore
import BasicTable, { BasicTableExpose, BasicTableProps } from '@/components/Table/BasicTable.vue'
import { onMounted, ref } from 'vue'

export type UseTableOptions = Partial<BasicTableProps>

export function useTable(options: UseTableOptions) {
  const tableRefEl = ref<Nullable<typeof BasicTable & HTMLElement & BasicTableExpose>>(null)

  onMounted(() => {
    tableRefEl.value?.setTableProps(options)
  })

  return {
    tableRefEl
  }
}
