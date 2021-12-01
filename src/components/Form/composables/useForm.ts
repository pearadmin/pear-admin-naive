import { computed, onMounted, Ref, ref, WritableComputedRef } from 'vue'
import type { BasicFormProps } from '@/components/Form'
import BasicForm from '@/components/Form'

export type UseFormOption = BasicFormProps

export interface ReturnUseForm {
  formRefEl: Ref<Nullable<typeof BasicForm>>
  modelValue: WritableComputedRef<Recordable>
}

export default function useForm(options?: UseFormOption): ReturnUseForm {
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

  return {
    formRefEl,
    modelValue
  }
}
