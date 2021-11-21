import { computed, DefineComponent, defineComponent, PropType, resolveComponent } from 'vue'
import { FormSchema } from '@/components/Form/typing'
import { componentMap } from '@/components/Form/component'

export default defineComponent({
  name: 'FormItem',
  props: {
    schema: {
      type: Object as PropType<FormSchema>,
      required: false
    }
  },
  setup(props) {
    const name = props.schema?.component ? props.schema.component : 'NInput'
    console.log(name)
    const Component = componentMap.get(name) as DefineComponent
    console.log(Component)
    return () => {
      return <Component></Component>
    }
  }
})
