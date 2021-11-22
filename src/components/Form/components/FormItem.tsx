import { computed, DefineComponent, defineComponent, PropType } from 'vue'
import { FormSchema } from '@/components/Form/typing'
import { componentMap } from '@/components/Form/component'

export default defineComponent({
  name: 'FormItem',
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const Component = computed((): DefineComponent => {
      const name = props.schema?.component ? props.schema.component : 'NInput'
      return componentMap.get(name) as DefineComponent
    })

    const comProps = computed((): Recordable => {
      return props.schema?.componentProps ? props.schema.componentProps : {}
    })

    return () => {
      return <Component.value {...comProps.value}></Component.value>
    }
  }
})
