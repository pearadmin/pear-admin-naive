import { computed, DefineComponent, defineComponent, PropType } from 'vue'
import { componentMap } from '@/components/Form/component'
import { FormSchema } from '@/components/Form/components/PearForm.vue'

export default defineComponent({
  name: 'PearFormItem',
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
      return props.schema?.componentProps ?? {}
    })

    const comSlots = computed(() => {
      return props.schema?.componentSlots ?? {}
    })

    return () => {
      return (
        <Component.value
          {...comProps.value}
          v-model={[props.formModelRef[props.schema.model], 'value']}
          v-slots={comSlots.value}
        ></Component.value>
      )
    }
  }
})
