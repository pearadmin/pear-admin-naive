import { computed, nextTick, onMounted, Ref, ref, WritableComputedRef } from 'vue'
import { PearFormProps, FormSchema } from '@/components/Form/components/PearForm.vue'
import PearForm from '@/components/Form/components/PearForm.vue'

export interface UseFormMethods {
  restoreValidation: () => Promise<void>
  setFormProps: (basicFormProps?: PearFormProps) => Promise<void>
  setFormSchemas: (schemas?: FormSchema[]) => Promise<void>
}

export interface ReturnUseForm {
  formRefEl: Ref<Nullable<typeof PearForm>>
  modelValue: WritableComputedRef<Recordable>
  methods: UseFormMethods
}

export default function useForm(options?: PearFormProps): ReturnUseForm {
  const formRefEl = ref<Nullable<typeof PearForm>>(null)

  onMounted(() => {
    options && formRefEl.value?.setFormProps(options)
  })

  const modelValue = computed(() => {
    return formRefEl.value?.getFormValue()
  })

  const methods: UseFormMethods = {
    restoreValidation: async () => {
      await nextTick()
      formRefEl.value?.restoreValidation()
    },
    setFormProps: async (formProps?: PearFormProps) => {
      await nextTick()
      formRefEl.value?.setFormProps(formProps)
    },
    setFormSchemas: async (schemas?: FormSchema[]) => {
      await nextTick()
      formRefEl.value?.setFormSchemas(schemas)
    }
  }

  return {
    formRefEl,
    modelValue,
    methods
  }
}
