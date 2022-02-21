import { computed, defineComponent } from 'vue'
import type { DefineComponent, PropType } from 'vue'
import { componentMap } from '@/components/Form/component'
import type { FormSchema } from '@/components/Form/components/PearForm.vue'
import { isFunction } from 'lodash-es'

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
  setup(props, { attrs }) {
    const Component = computed((): DefineComponent => {
      const name = props.schema?.component ? props.schema.component : 'NInput'
      return componentMap.get(name) as DefineComponent
    })

    const comProps = computed((): Recordable => {
      // 支持动态props
      const keys = Object.keys(props.schema?.componentProps ?? {})
      /**
       * componentProps: {
       *   aaa: 'aaa',
       *   xxx: (formModelRef) => {
       *     return xxx
       *   },
       *   onXXX: () => function onXXX(){}
       * }
       * 排除以on开头的，一般来说，以on开头的多为函数，所以不做处理
       */
      const innerProps = keys.reduce((resProps, key) => {
        const itemProp = props.schema?.componentProps ?? null
        if (itemProp) {
          return {
            ...resProps,
            [key]:
              isFunction(itemProp[key]) && !key.startsWith('on')
                ? itemProp[key](props.formModelRef)
                : itemProp[key]
          }
        }
        return resProps
      }, {} as Recordable)
      return innerProps
    })

    const comSlots = computed(() => {
      return props.schema?.componentSlots ?? {}
    })

    return () => {
      const DynamicComponent = Component.value
      return (
        <DynamicComponent
          {...{ ...comProps.value, ...attrs }}
          v-model={[props.formModelRef[props.schema.model], 'value']}
          v-slots={comSlots.value}
        />
      )
    }
  }
})
