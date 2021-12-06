import { computed, onMounted, Ref, ref, WritableComputedRef } from 'vue'
import type { BasicFormProps } from '@/components/Form'
import BasicForm from '@/components/Form'

export interface UseFormMethods {
  restoreValidation: () => void
}

export interface ReturnUseForm {
  formRefEl: Ref<Nullable<typeof BasicForm>>
  modelValue: WritableComputedRef<Recordable>
  methods: UseFormMethods
}

export default function useForm(options?: BasicFormProps): ReturnUseForm {
  const formRefEl = ref<typeof BasicForm | null>(null)

  onMounted(() => {
    options && formRefEl.value?.updFormProps(options)
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
    restoreValidation: (): void => {
      formRefEl.value.restoreValidation()
    }
  }

  return {
    formRefEl,
    modelValue,
    methods
  }
}
