import { ref, watchEffect } from 'vue'
import type { ComputedRef } from 'vue'
import { DEFAULT_TABLE_HEIGHT, DEFAULT_TABLE_SIZE } from '@/config'

import type { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'
import type { PearTableProps } from '@/components/Table/components/PearTable.vue'
import { get } from '@vueuse/core'

export interface PTableColumns extends TableBaseColumn {
  visible: boolean
}

export const NOT_RENDER_KEYS = ['expand', 'selection']

export type TableSize = 'small' | 'medium' | 'large'

export function useTableBaseConfig(props: ComputedRef<Partial<PearTableProps>>) {
  // table size
  const sizeRef = ref<TableSize>(DEFAULT_TABLE_SIZE)

  // table height
  const heightRef = ref<number>(DEFAULT_TABLE_HEIGHT)

  // icon size
  const iconSizeRef = ref<number>(18)

  // columns
  const columns = ref<PTableColumns[]>([])

  watchEffect(() => {
    if (get(props)?.size) {
      sizeRef.value = get(get(props)?.size) as TableSize
    }
    if (get(props)?.columns) {
      columns.value = get(props)?.columns?.map((col) => ({
        ...col,
        visible: true
      })) as PTableColumns[]
    }
  })

  return {
    tableSize: sizeRef,
    tableHeight: heightRef,
    iconSize: iconSizeRef,
    columns
  }
}
