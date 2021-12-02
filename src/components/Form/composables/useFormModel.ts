import { BasicFormProps } from '@/components/Form'
import { Ref, ref, watch, computed } from 'vue'

export default function useFormModel(props: Ref<BasicFormProps>) {
  const initialModel = computed(() => props.value.model)
  const schemas = computed(() => props.value.schemas)
  const formModelRef = ref<Recordable>({})
  watch(initialModel, (val) => console.log(val))
  watch(
    [schemas, initialModel],
    ([formSchemas, initialData]) => {
      let formModel: Recordable = {}
      if (formSchemas && formSchemas.length > 0) {
        const schemaModel = formSchemas.reduce((modelObject, schema) => {
          return {
            ...modelObject,
            [schema.model]: undefined
          }
        }, {} as Recordable)
        if (initialData) {
          formModel = Object.assign(schemaModel, initialData)
        }
        formModelRef.value = formModel
      }
    },
    { immediate: true }
  )

  return {
    formModelRef
  }
}
