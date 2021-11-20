import { computed, defineComponent, PropType, toRef } from 'vue'
import { NForm, NGrid, NFormItemGi } from 'naive-ui'
import type { FormProps } from 'naive-ui'
import { merge } from 'lodash-es'
import { getComponentProps } from '@/utils/componentUtil'
import { FormSchema } from '@/components/Form/typing'

export interface BasicFormProps extends FormProps {
  schema?: FormSchema[]
}

export default defineComponent({
  name: 'BasicForm',
  components: {
    NForm,
    NGrid,
    NFormItemGi,
  },
  props: merge(
    {
      schema: {
        type: Array as PropType<FormSchema[]>
      }
    },
    NForm.props
  ),
  setup(props) {
    const formProps = computed((): FormProps => {
      return getComponentProps<typeof props, FormProps>(props, NForm.props)
    })
    const { schema } = toRef(props, 'schema')
    return () => {
      return <NForm {...formProps.value}>
        <NGrid cols={24} x-gap={24}>
          <n-form-item-gi></n-form-item-gi>
        </NGrid>
      </NForm>
    }
  }
})
