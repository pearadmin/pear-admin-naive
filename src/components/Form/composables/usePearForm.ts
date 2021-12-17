import {
  PearFormProps,
  PearFormExpose,
  FormSchema
} from '@/components/Form/components/PearForm.vue'
import PearForm from '@/components/Form/components/PearForm.vue'
import { nextTick, onMounted, ref, watchEffect } from 'vue'

export function usePearForm(pearFormProps?: Partial<PearFormProps>) {
  const formRefEl = ref<Nullable<HTMLElement & typeof PearForm & PearFormExpose>>(null)

  // const values = computed(() => {
  //   return formRefEl.value?.getFormValue()
  // })

  const values = ref<Recordable>({})

  watchEffect(() => {
    values.value = (formRefEl.value?.getFormValue() as Recordable) ?? {}
  })

  onMounted(() => {
    if (pearFormProps) {
      formRefEl.value?.register(pearFormProps)
    }
  })

  const methods = {
    restoreValidation: async () => {
      await nextTick()
      formRefEl.value?.restoreValidation()
    },
    setFormProps: async (formProps?: Partial<PearFormProps>) => {
      await nextTick()
      formRefEl.value?.setFormProps(formProps)
    },
    setFormSchemas: async (schemas?: FormSchema[]) => {
      await nextTick()
      formRefEl.value?.setFormSchemas(schemas)
    },
    reset: () => {
      formRefEl.value?.restoreValidation()
    }
  }

  return {
    formRefEl,
    values,
    methods
  }
}
