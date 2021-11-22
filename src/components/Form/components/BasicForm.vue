<script setup lang="ts">
  import { NForm, NGrid, NFormItemGi, FormRules } from 'naive-ui'
  import FormItem from './FormItem'
  import { computed, Slots, useAttrs, watch } from 'vue'
  import useFormModel from '@/components/Form/composables/useFormModel'

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
    field: string
    wrapperProps?: {
      offset?: number
      span?: number
      suffix?: boolean
    }
    // maybe not need
    wrapperSlots?: (() => Slots | HTMLElement) | Slots
  }

  export interface BasicFormProps {
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
      cols: 24,
      collapsed: false,
      collapsedRows: 1,
      responsive: 'self',
      itemResponsive: false,
      xGap: 0,
      yGap: 0
    })
  })

  const attrs = useAttrs()

  function getFormItemGiSpan(schema: FormSchema) {
    return schema.wrapperProps?.span ? schema.wrapperProps?.span : 24
  }

  const { formModelRef } = useFormModel(props)

  watch(formModelRef, (v) => {
    console.log('model val => ', v)
  })
</script>

<template>
  <NForm :model="formModelRef" v-bind="attrs">
    <NGrid v-bind="gridProps">
      <NFormItemGi
        v-for="schema in schemas"
        :key="schema.model"
        :path="schema.model"
        :span="getFormItemGiSpan(schema)"
        v-bind="schema?.formItemProps ? schema.formItemProps : {}"
      >
        <FormItem :schema="schema"></FormItem>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<style scoped></style>
