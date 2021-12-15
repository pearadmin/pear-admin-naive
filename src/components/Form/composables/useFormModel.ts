import { Ref, ref, watch } from 'vue'
import { merge } from 'lodash-es'
import { BasicFormProps, FormSchema } from '@/components/Form/components/BasicForm.vue'

export interface UseFormModelMethods {
  restFormValue: () => void
  // updFormSchema: (schema: FormSchema) => void
  // setFormSchemas: (schemas?: FormSchema[]) => void
  // updFormSchemas: (schemas?: FormSchema[]) => void
  updModelValue: (model?: Recordable) => void
}

export interface UseFormModelReturn {
  formModelRef: Ref<Recordable>
  methods: UseFormModelMethods
}

export default function useFormModel(props: Ref<BasicFormProps>): UseFormModelReturn {
  const initialModel = ref<Recordable>({})
  const schemas = ref<FormSchema[]>([])
  const formModelRef = ref<Recordable>({})

  watch(
    () => props,
    (pp) => {
      initialModel.value = pp.value.model ?? {}
      schemas.value = pp.value.schemas ?? []
    },
    { immediate: true, deep: true }
  )

  watch(
    [schemas, initialModel],
    ([formSchemas, initialData]) => {
      initialFormModelRef(initialData, formSchemas)
    },
    { immediate: true }
  )

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

  // reset form modelRef value
  function restFormValue() {
    initialFormModelRef(initialModel.value, schemas.value)
  }

  // // update schema item
  // function updFormSchema(updSchema: FormSchema) {
  //   const index = schemas.value.findIndex((it) => it.model === updSchema.model)
  //   schemas.value[index] = merge({}, schemas.value[index], updSchema)
  // }
  //
  // // set schemas
  // function setFormSchemas(initial: FormSchema[]) {
  //   initial && (schemas.value = initial)
  // }
  //
  // // update schemas
  // function updFormSchemas(updSchemas?: FormSchema[]) {
  //   if (updSchemas) {
  //     schemas.value.forEach((it) => {
  //       updSchemas.forEach((up) => {
  //         if (it.model === up.model) {
  //           it = merge({}, it, up)
  //         }
  //       })
  //     })
  //   }
  // }

  // update modelValue
  function updModelValue(model: Recordable) {
    if (model) {
      merge(initialModel.value, model)
    }
  }

  const methods = {
    restFormValue,
    // setFormSchemas,
    // updFormSchema,
    // updFormSchemas,
    updModelValue
  }

  return {
    formModelRef,
    // schemas,
    methods
  }
}
