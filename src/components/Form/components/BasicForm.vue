<script setup lang="ts">
  import FormItem from './FormItem'
  import { computed, ref, Slots, useAttrs } from 'vue'
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
      cols?: number | string
      collapsed?: boolean
      collapsedRows?: number
      responsive?: 'self' | 'screen' | string // todo remove string
      itemResponsive?: boolean
      xGap?: number
      yGap?: number
    }
  }

  export interface BasicFormExpose {
    getFormValue: () => Recordable
    setFormProps: (formProps?: BasicFormProps) => void
    updFormValue: (updModel: Recordable) => void
    restoreValidation: () => void
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

  const innerProps = ref<BasicFormProps>({})

  const proxyProps = computed((): BasicFormProps => {
    return merge({}, props, innerProps.value)
  })

  const attrs = useAttrs()

  const { formModelRef, methods: useFormMethods } = useFormModel(proxyProps)

  const formRefEl = ref<typeof NForm | null>(null)

  defineExpose<BasicFormExpose>({
    getFormValue: (): Recordable => {
      return formModelRef.value
    },
    setFormProps: (formProps?: BasicFormProps) => {
      formProps && (innerProps.value = formProps)
    },
    updFormValue: (updModel: Recordable): void => {
      formModelRef.value = merge(formModelRef.value, updModel)
    },
    restoreValidation: () => {
      formRefEl.value?.restoreValidation()
      useFormMethods.restFormValue()
    }
  })
</script>

<template>
  <NForm ref="formRefEl" :model="formModelRef" v-bind="attrs">
    <NGrid v-bind="proxyProps.gridProps" item-responsive style="justify-content: space-between">
      <NFormItemGi
        v-for="schema in proxyProps.schemas"
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
