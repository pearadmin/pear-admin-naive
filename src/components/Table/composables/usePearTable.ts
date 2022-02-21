// @ts-ignore
import type { PearTableExpose, PearTableProps } from '@/components/Table/PearTable.vue'
import { onUnmounted, ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { makeDestructurable } from '@vueuse/core'

export type UseTableOptions = Partial<PearTableProps>

export function usePearTable(options: MaybeRef<UseTableOptions>) {
  const tableExpose = ref<Nullable<PearTableExpose>>()

  function registerTable(expose?: PearTableExpose) {
    if (expose) {
      tableExpose.value = expose
      expose.updTableProps(options)
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
