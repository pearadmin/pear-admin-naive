import { computed, ref, watch } from 'vue'
import { TableBaseColumn } from 'naive-ui/es/data-table/src/interface'

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

  watch(
    columns,
    (cols) => {
      console.log('outer = > ', cols)
      caches.value = cols.filter((it) => {
        console.log(it.visible)
        return it.visible || (it.type && NOT_RENDER_KEYS.includes(it.type))
      })
      console.log(caches.value)
    },
    { deep: true }
  )

  watch(
    computedCol,
    (cols) => {
      columns.value = cols.map((col) => ({ ...col, visible: true }))
    },
    { immediate: true, deep: true, flush: 'post' }
  )

  return {
    columns: caches
  }
}
