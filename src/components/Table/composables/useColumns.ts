import { computed, ref, watch } from 'vue'
import { DataTableColumns } from 'naive-ui'

export function useColumns (basicTableAttrs: Recordable) {
  const computedCol = computed(() => {
    return basicTableAttrs?.columns ? basicTableAttrs.columns : []
  })

  const columns = ref<DataTableColumns>([])

  watch(computedCol, cols => {
    columns.value = cols
  }, { immediate: true, deep: true })

  return {
    columns
  }
}
