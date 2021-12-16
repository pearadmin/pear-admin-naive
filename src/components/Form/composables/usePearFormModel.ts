import { PearFormProps, FormSchema } from '@/components/Form/components/PearForm.vue'
import { ComputedRef, ref, watchEffect } from 'vue'
import { get } from '@vueuse/core'

export function usePearFormModel(props: ComputedRef<Partial<PearFormProps>>) {
  const formModelRef = ref<Recordable>({})

  function handleInitModel(model: Recordable | undefined, formSchemas: FormSchema[] | undefined) {
    let formModel: Recordable = {}
    if (formSchemas && formSchemas.length > 0) {
      const schemaModel = formSchemas.reduce((modelObject, schema) => {
        return {
          ...modelObject,
          [schema.model]: null
        }
      }, {} as Recordable)
      if (model) {
        formModel = Object.assign(schemaModel, model)
      }
      formModelRef.value = formModel
    }
  }

  function restFormValue() {
    handleInitModel(props.value.model, props.value.schemas)
  }

  watchEffect(() => {
    const model = get(props, 'model')
    const schemas = get(props, 'schemas')
    if (model || schemas) {
      handleInitModel(model, schemas)
    }
  })

  return {
    formModelRef,
    methods: {
      restFormValue
    }
  }
}