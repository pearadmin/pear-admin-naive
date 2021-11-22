import { computed, provide, ref } from 'vue'
import { DEFAULT_TABLE_SIZE } from '@/config'
import { TableProps } from 'naive-ui'

export function useTableConfig (attrs: Record<string, unknown>) {
  const sizeComputedRef = computed((): TableProps['size'] => {
    return attrs?.size ? attrs.size as TableProps['size'] : DEFAULT_TABLE_SIZE
  })
  const sizeRef = ref<TableProps['size']>(sizeComputedRef.value)
  function changeTableSize (size: TableProps['size']) {
    sizeRef.value = size
  }
  provide('tableSize', sizeRef)
  provide('changeTableSize', changeTableSize)

  return {
    tableSize: sizeRef
  }
}
