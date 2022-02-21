import { computed, ref, watch } from 'vue'
import type { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'

export interface PTableColumns extends TableBaseColumn {
  visible: boolean
}

export const NOT_RENDER_KEYS = ['expand', 'selection']

export function useColumns(basicTableAttrs: Recordable) {
  const computedCol = computed(() => {
    return basicTableAttrs?.columns ? basicTableAttrs.columns : []
  })

  const columns = ref<PTableColumns[]>([])
  const caches = ref<PTableColumns[]>([])

  function updColumns(upd: PTableColumns[]) {
    columns.value = upd
  }

  watch(
    columns,
    (cols) => {
      caches.value = cols.filter((it) => {
        return it.visible || (it.type && NOT_RENDER_KEYS.includes(it.type))
      })
    },
    { deep: true }
  )

  watch(
    computedCol,
    (cols) => {
      columns.value = cols.map((col) => ({ ...col, visible: true }))
    },
    { immediate: true, deep: true }
  )

  return {
    columns: caches,
    updColumns
  }
}
