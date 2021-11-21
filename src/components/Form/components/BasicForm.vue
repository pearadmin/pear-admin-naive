<script setup lang="ts">
  import { NForm, NGrid, NFormItemGi, FormRules } from 'naive-ui'
  import FormItem from './FormItem'
  import { Slots, useAttrs } from 'vue'

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
  }

  const props = withDefaults(defineProps<BasicFormProps>(), {
    schemas: () => []
  })

  const attrs = useAttrs()

  function getFormItemGiSpan (schema: FormSchema) {
    return schema.wrapperProps?.span ? schema.wrapperProps?.span : 24
  }

</script>

<template>
  <NForm v-bind="attrs">
    <NGrid :cols="24">
      <NFormItemGi
        v-for="item in schemas"
        :key='item.model'
        :path='item.model'
        :span='getFormItemGiSpan(item)'
      >
        <FormItem v-bind="item"></FormItem>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<style scoped></style>
