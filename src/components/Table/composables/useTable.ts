// @ts-ignore
import BasicTable, { BasicTableExpose, PearTableProps } from '@/components/Table/PearTableProps.vue'
import { onMounted, ref } from 'vue'

export type UseTableOptions = Partial<PearTableProps>

export function useTable(options: UseTableOptions) {
  const tableRefEl = ref<Nullable<typeof BasicTable & HTMLElement & BasicTableExpose>>(null)

  onMounted(() => {
    tableRefEl.value?.setTableProps(options)
  })

  return {
    tableRefEl
  }
}
