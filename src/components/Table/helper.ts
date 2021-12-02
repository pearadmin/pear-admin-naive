// @ts-ignore
import { ColumnsSetting } from '@/components/Table/components/ColumnSetting.vue'
import { ref } from 'vue'

export function getColumns(columns: ColumnsSetting) {
  const left: ColumnsSetting = []
  const right: ColumnsSetting = []
  const center: ColumnsSetting = []
  columns.forEach((col) => {
    col.visible = ref(true)
    col.elRef = ref(null)
    if (col.type && col.type === 'selection') {
      col.title = 'Selection'
    }
    if (col.type && col.type === 'expand') {
      col.title = 'Expand'
    }
    if (col.fixed && col.fixed === 'left') {
      left.push(col)
    } else if (col.fixed && col.fixed === 'right') {
      right.push(col)
    } else {
      center.push(col)
    }
  })
  return {
    left,
    right,
    center
  }
}
