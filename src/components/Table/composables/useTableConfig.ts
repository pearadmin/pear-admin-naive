import { ComputedRef, provide, Ref, ref, watch } from 'vue'
import { DEFAULT_TABLE_SIZE } from '@/config'

export interface TableConfigOptions {
  attrs: Record<string, any>
  fetchRunner: ComputedRef<() => Promise<any>>
  iconSize: Ref<number>
}

export const tableSizeInjectKey = Symbol('tableSize')
export const changeTableSizeInjectKey = Symbol('changeTableSize')
export const fetchRunnerInjectKey = Symbol('fetchRunner')
export const iconSizeInjectKey = Symbol('iconSize')

export type TableSize = 'small' | 'medium' | 'large'

export function useTableConfig(options: ComputedRef<TableConfigOptions>) {
  // table size
  const sizeRef = ref<TableSize>(DEFAULT_TABLE_SIZE)

  // change table Size
  function changeTableSize(size: TableSize) {
    sizeRef.value = size
  }

  watch(
    options,
    (o) => {
      if (o.attrs.size) {
        // 可以是最外层table设置的size值
        sizeRef.value = o.attrs.size
      }
    },
    { immediate: true }
  )
  console.log(sizeRef)
  provide<Ref<TableSize>>(tableSizeInjectKey, sizeRef)
  provide<(size: TableSize) => void>(changeTableSizeInjectKey, changeTableSize)
  provide<ComputedRef<() => Promise<any>>>(fetchRunnerInjectKey, options.value.fetchRunner)
  provide<Ref<number>>(iconSizeInjectKey, options.value.iconSize)

  return {
    tableSize: sizeRef
  }
}
