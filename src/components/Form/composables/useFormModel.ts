import { BasicFormProps } from '@/components/Form/components/BasicForm.vue'
import { ref, toRef, watch } from 'vue'

export default function useFormModel(props: Readonly<BasicFormProps>) {
  const schemas = toRef(props, 'schemas')
  const formModal = ref<Recordable>({})

  watch(schemas, (formSchemas) => {
    if (formSchemas && formSchemas.length > 0) {
      const model = formSchemas.reduce((modelObject, schema) => {
        return {
          ...modelObject,
          [schema.model]: undefined
        }
      }, {} as Recordable)
      formModal.value = model
    }
  }, { immediate: true })

  return {
    formModelRef: formModal
  }
}
