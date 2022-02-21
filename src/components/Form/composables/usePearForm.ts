import type { PearFormProps, PearFormExpose } from '@/components/Form/components/PearForm.vue'
import { isRef, nextTick, onUnmounted, ref, unref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { makeDestructurable } from '@vueuse/core'

export interface UseFormMethods {
  values: Ref<Recordable>
  getFormValue: () => Recordable
  restoreValidation: () => Promise<void>
  updFormProps: (formProps?: Partial<PearFormProps>) => Promise<void>
  validate: (args?: any) => Promise<void>
  reset: () => void
}

export function usePearForm(pearFormProps?: MaybeRef<Partial<PearFormProps>>) {
  const formExpose = ref<Nullable<PearFormExpose>>(null)

  function registerForm(expose: PearFormExpose) {
    formExpose.value = expose
    if (pearFormProps) {
      expose.updFormProps(unref(pearFormProps))
    }
  }

  const values = ref<Recordable>({})

  watchEffect(() => {
    values.value = (unref(formExpose)?.getFormValue() as Recordable) ?? {}
    if (isRef(pearFormProps)) {
      formExpose.value?.updFormProps(unref(pearFormProps))
    }
  })

  onUnmounted(() => {
    formExpose.value = null
  })

  const methods: UseFormMethods = {
    values,
    getFormValue: () => {
      return values.value
    },
    restoreValidation: async () => {
      await nextTick()
      unref(formExpose)?.restoreValidation()
    },
    updFormProps: async (formProps?: Partial<PearFormProps>) => {
      await nextTick()
      unref(formExpose)?.updFormProps(formProps)
    },
    validate: async (args?: any) => {
      await nextTick()
      return unref(formExpose)?.validate(args)
    },
    reset: () => {
      unref(formExpose)?.restoreValidation()
    }
  }

  return makeDestructurable(
    {
      registerForm,
      methods
    } as const,
    [registerForm, methods]
  )
}
