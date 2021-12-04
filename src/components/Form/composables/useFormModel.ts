import { BasicFormProps, FormSchema } from '@/components/Form'
import { Ref, ref, watch, computed } from 'vue'

export default function useFormModel(props: Ref<BasicFormProps>) {
  const initialModel = computed(() => props.value.model)
  const schemas = computed(() => props.value.schemas)
  const formModelRef = ref<Recordable>({})

  function initialFormModelRef(
    initialData: Recordable | undefined,
    formSchemas: FormSchema[] | undefined
  ) {
    let formModel: Recordable = {}
    if (formSchemas && formSchemas.length > 0) {
      const schemaModel = formSchemas.reduce((modelObject, schema) => {
        return {
          ...modelObject,
          [schema.model]: null
        }
      }, {} as Recordable)
      if (initialData) {
        formModel = Object.assign(schemaModel, initialData)
      }
      formModelRef.value = formModel
    }
  }
  watch(
    [schemas, initialModel],
    ([formSchemas, initialData]) => {
      initialFormModelRef(initialData, formSchemas)
    },
    { immediate: true }
  )

  // reset form modelRef value
  function restFormValue() {
    initialFormModelRef(initialModel.value, schemas.value)
  }

  return {
    formModelRef,
    restFormValue
  }
}
