<script setup lang="ts">
  import FormItem from './FormItem'
  import { ref, Slots, useAttrs, watch } from 'vue'
  import useFormModel from '@/components/Form/composables/useFormModel'
  import { merge } from 'lodash-es'
  import { NForm } from 'naive-ui'

  export type ComponentName =
    | 'NInput'
    | 'NSelect'
    | 'NRadio'
    | 'NSwitch'
    | 'NColorPicker'
    | 'NCheckbox'
    | 'NDatePicker'
    | 'Slot'

  export interface FormSchema {
    model: string
    component?: ComponentName
    componentProps?: Recordable
    componentSlots?: (() => Slots | HTMLElement) | Slots
    formItemProps?: Recordable
    // field: string
    // maybe not need
    wrapperSlots?: (() => Slots | HTMLElement) | Slots
  }

  export interface BasicFormProps {
    model?: Recordable
    schemas?: FormSchema[]
    gridProps?: {
      cols?: number
      collapsed?: boolean
      collapsedRows?: number
      responsive?: 'self' | 'screen'
      itemResponsive?: boolean
      xGap?: number
      yGap?: number
    }
  }

  const props = withDefaults(defineProps<BasicFormProps>(), {
    schemas: () => [],
    gridProps: () => ({
      cols: 3,
      collapsed: false,
      collapsedRows: 1,
      responsive: 'self',
      itemResponsive: false,
      xGap: 12,
      yGap: 0
    })
  })

  const basicFormProps = ref<BasicFormProps>({})

  watch(
    () => props,
    (pp) => {
      basicFormProps.value = { ...pp }
    },
    { immediate: true, deep: true }
  )

  const attrs = useAttrs()

  const { formModelRef, restFormValue } = useFormModel(basicFormProps)

  const formRefEl = ref<typeof NForm | null>(null)

  defineExpose({
    getFormValue: (): Recordable => {
      return formModelRef.value
    },
    updFormValue: (updModel: Recordable): void => {
      formModelRef.value = merge(formModelRef.value, updModel)
    },
    updFormProps: (options: BasicFormProps): void => {
      merge(basicFormProps.value, options)
    },
    restoreValidation: () => {
      formRefEl.value?.restoreValidation()
      restFormValue()
    }
  })
</script>

<template>
  <NForm ref="formRefEl" :model="formModelRef" v-bind="attrs">
    <NGrid v-bind="basicFormProps.gridProps" item-responsive style="justify-content: space-between">
      <NFormItemGi
        v-for="schema in basicFormProps.schemas"
        :key="schema.model"
        :path="schema.model"
        v-bind="schema?.formItemProps ? schema.formItemProps : {}"
      >
        <FormItem :schema="schema" :form-model-ref="formModelRef" />
      </NFormItemGi>
      <NFormItemGi v-if="$slots.formAction" suffix style="margin-left: auto">
        <NSpace justify="end">
          <slot name="formAction"></slot>
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<style scoped></style>
