<script setup lang="ts">
  import FormItem from './FormItem'
  import { ref, Slots, useAttrs, watch } from 'vue'
  import useFormModel from '@/components/Form/composables/useFormModel'
  import { merge } from 'lodash-es'
  import { ButtonProps, NForm } from 'naive-ui'

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

  export interface FormActionItem {
    label: (() => string) | string
    handler: (() => void) | (() => Promise<void>)
    buttonProps?: ButtonProps
  }

  export type FormAction = FormActionItem[]

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
    formAction?: FormAction
  }

  const props = withDefaults(defineProps<BasicFormProps>(), {
    schemas: () => [],
    gridProps: () => ({
      cols: 24,
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

  const { formModelRef } = useFormModel(basicFormProps)

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
    }
  })
</script>

<template>
  <NForm ref="formRefEl" :model="formModelRef" v-bind="attrs">
    <NGrid v-bind="basicFormProps.gridProps">
      <NFormItemGi
        v-for="schema in basicFormProps.schemas"
        :key="schema.model"
        :path="schema.model"
        v-bind="schema?.formItemProps ? schema.formItemProps : {}"
      >
        <FormItem :schema="schema" :form-model-ref="formModelRef" />
      </NFormItemGi>
      <NFormItemGi v-if="formAction && formAction.length > 0" :span="8">
        <NSpace>
          <NButton
            v-for="(action, index) in formAction"
            :key="index"
            v-bind="action.buttonProps"
            @click.stop="action.handler"
          >
            {{ action.label }}
          </NButton>
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<style scoped></style>
