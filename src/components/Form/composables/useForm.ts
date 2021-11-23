import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import type { BasicFormProps } from '@/components/Form'
import BasicForm from '@/components/Form'

export interface UseFormOption extends BasicFormProps {
}

export default function useForm(options?: UseFormOption) {
  const formRefEl = ref<typeof BasicForm | null>(null)

  onMounted(() => {
    options && formRefEl.value?.updFormProps(options)
    modelValue.value = formRefEl.value?.getFormValue()
  })

  const modelValue = computed({
    get: () => {
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
