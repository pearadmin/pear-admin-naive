// @ts-ignore
import { BasicTableProps } from '@/components/Table/BasicTable.vue'
import { ref, watch } from 'vue'

export default function useTableFetch(props: Readonly<BasicTableProps>) {
  const fetchConfig = ref<Nullable<Recordable>>(null)

  watch(() => props.api, (api) => {
    if (props.fetch) {
      fetchConfig.value = props.fetch
    }
  }, { deep: true })
}
