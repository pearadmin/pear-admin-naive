import type {
  PearTableExpose,
  PearTableProps,
  TableFetch
} from '@/components/Table/components/PearTable.vue'
import { onUnmounted, ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { get, makeDestructurable } from '@vueuse/core'

export type TableProps = PearTableProps & {
  fetch?: MaybeRef<TableFetch>
}

export function usePearTable(options: MaybeRef<Partial<TableProps>>) {
  const tableExpose = ref<Nullable<PearTableExpose>>()

  function registerTable(expose?: PearTableExpose) {
    if (expose) {
      tableExpose.value = expose
      expose.updTableProps(get(options) as PearTableProps)
    }
  }

  onUnmounted(() => {
    tableExpose.value = null
  })

  const methods = {
    getFormValue: () => {
      return tableExpose.value?.searchFormValue
    }
  }

  return makeDestructurable({ registerTable, methods } as const, [registerTable, methods] as const)
}
