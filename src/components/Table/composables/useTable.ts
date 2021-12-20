// @ts-ignore
import { PearTableExpose, PearTableProps } from '@/components/Table/PearTable.vue'
import { onUnmounted, ref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { makeDestructurable } from '@vueuse/core'

export type UseTableOptions = Partial<PearTableProps>

export function useTable(options: MaybeRef<UseTableOptions>) {
  const tableExpose = ref<Nullable<PearTableExpose>>()

  function register(expose?: PearTableExpose) {
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

  return makeDestructurable({ register, methods } as const, [register, methods] as const)
}
