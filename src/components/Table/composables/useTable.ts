// @ts-ignore
import BasicTable, { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { onMounted, ref, WritableComputedRef } from 'vue'
import { UseFormMethods } from '@/components/Form/composables/useForm'

// 这里手写defineExpose类型，vue3更新defineExpose类型支持后再修改
// 对应BasicTable.vue中expose出来的对象
interface TableExposeType {
  searchFormValue: WritableComputedRef<Recordable>
  handleReset: () => void
  formMethods: UseFormMethods
  setTableProps: (updProps: Partial<BasicTableProps>) => void
}

/**
 * 传递的是二次封装的组件的props
 */
export type UseTableOptions = Partial<BasicTableProps>

export function useTable(options: UseTableOptions) {
  const tableRefEl = ref<Nullable<typeof BasicTable & TableExposeType & HTMLElement>>(null)

  onMounted(() => {
    tableRefEl.value?.setTableProps(options)
  })

  return {
    tableRefEl
  }
}
