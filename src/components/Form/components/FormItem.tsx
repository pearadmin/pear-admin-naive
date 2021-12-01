import { computed, DefineComponent, defineComponent, PropType } from 'vue'
import type { FormSchema } from '@/components/Form'
import { componentMap } from '@/components/Form/component'

export default defineComponent({
  name: 'FormItem',
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: false,
      default: () => ({})
    },
    formModelRef: {
      type: Object as PropType<Recordable>,
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

    const comSlots = computed(() => {
      return props.schema?.componentSlots ? props.schema?.componentSlots : {}
    })

    return () => {
      return (
        <Component.value
          v-model={[props.formModelRef[props.schema?.model], 'value']}
          {...comProps.value}
          v-slots={comSlots.value}
        ></Component.value>
      )
    }
  }
})
