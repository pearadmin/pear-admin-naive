<script setup lang="ts">
  import { NForm, NGrid, NFormItemGi, FormRules } from 'naive-ui'
  import FormItem from './FormItem'
  import { computed, Ref, Slots, useAttrs, watch } from 'vue'
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
      xGap: 12,
      yGap: 0
    })
  })

  const attrs = useAttrs()

  const { formModelRef } = useFormModel(props)

  defineExpose({
    getFormValue: (): Ref<Recordable> => {
      return formModelRef
    }
  })

</script>

<template>
  <NForm :model="formModelRef" v-bind="attrs">
    <NGrid v-bind="gridProps">
      <NFormItemGi
        v-for="schema in schemas"
        :key="schema.model"
        :path="schema.model"
        v-bind="schema?.formItemProps ? schema.formItemProps : {}"
      >
        <FormItem :schema="schema" :formModelRef="formModelRef"></FormItem>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<style scoped></style>
