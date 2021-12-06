import { computed, nextTick, onMounted, Ref, ref, WritableComputedRef } from 'vue'
import type { BasicFormProps, FormSchema } from '@/components/Form'
import BasicForm from '@/components/Form'

export interface UseFormMethods {
  restoreValidation: () => Promise<void>
  setFormProps: (basicFormProps?: BasicFormProps) => Promise<void>
  setFormSchemas: (schemas?: FormSchema[]) => Promise<void>
}

export interface ReturnUseForm {
  formRefEl: Ref<Nullable<typeof BasicForm>>
  modelValue: WritableComputedRef<Recordable>
  methods: UseFormMethods
}

export default function useForm(options?: BasicFormProps): ReturnUseForm {
  const formRefEl = ref<Nullable<typeof BasicForm & UseFormMethods>>(null)

  onMounted(() => {
    options && formRefEl.value?.setFormProps(options)
    modelValue.value = formRefEl.value?.getFormValue()
  })

  const modelValue = computed({
    get: (): Recordable => {
      return formRefEl.value?.getFormValue()
    },
    set: (val) => {
      return formRefEl.value?.updFormValue(val)
    }
  })

  const methods: UseFormMethods = {
    restoreValidation: async () => {
      await nextTick()
      formRefEl.value?.restoreValidation()
    },
    setFormProps: async (formProps?: BasicFormProps) => {
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
