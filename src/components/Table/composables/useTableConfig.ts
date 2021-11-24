import { ComputedRef, provide, Ref, ref, watch } from 'vue'
import { DEFAULT_TABLE_HEIGHT, DEFAULT_TABLE_SIZE } from '@/config'

export interface TableConfigOptions {
  attrs: Record<string, any>
  fetchRunner: Ref<() => Promise<any>>
  iconSize: Ref<number>
}

export const tableSizeInjectKey = Symbol('tableSize')
export const changeTableSizeInjectKey = Symbol('changeTableSize')
export const fetchRunnerInjectKey = Symbol('fetchRunner')
export const iconSizeInjectKey = Symbol('iconSize')

export const tableHeightInjectKey = Symbol('tableHeight')
export const changeTableHeightInjectKey = Symbol('changeTableHeight')

export type TableSize = 'small' | 'medium' | 'large'

export function useTableConfig(options: ComputedRef<TableConfigOptions>) {
  // table size
  const sizeRef = ref<TableSize>(DEFAULT_TABLE_SIZE)

  // change table Size
  function changeTableSize(size: TableSize) {
    sizeRef.value = size
  }

  // table height
  const heightRef = ref<number>(DEFAULT_TABLE_HEIGHT)

  function changeTableHeight(height: number) {
    heightRef.value = height
  }

  watch(
    options,
    (o) => {
      if (o.attrs.size) {
        // 可以是最外层table设置的size值
        sizeRef.value = o.attrs.size
      }
      if (o.attrs.height) {
        heightRef.value = o.attrs.height
      }
    },
    { immediate: true }
  )
  provide<Ref<TableSize>>(tableSizeInjectKey, sizeRef)
  provide<(size: TableSize) => void>(changeTableSizeInjectKey, changeTableSize)
  provide<Ref<() => Promise<any>>>(fetchRunnerInjectKey, options.value.fetchRunner)
  provide<Ref<number>>(iconSizeInjectKey, options.value.iconSize)

  provide<Ref<number>>(tableHeightInjectKey, heightRef)
  provide<(height: number) => void>(changeTableHeightInjectKey, changeTableHeight)

  return {
    tableSize: sizeRef,
    tableHeight: heightRef
  }
}
