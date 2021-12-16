<script setup lang="ts">
  import { FormItemRule, NForm } from 'naive-ui'
  import { computed, Ref, ref, Slots, useAttrs } from 'vue'
  import { merge, omit } from 'lodash-es'
  import { usePearFormModel } from '@/components/Form/composables/usePearFormModel'
  import PearFormItem from '@/components/Form/components/PearFormItem'

  export type FormRules = {
    [itemValidatePath: string]: FormItemRule | Array<FormItemRule> | FormRules
  }

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
    // wrapperSlots?: (() => Slots | HTMLElement) | Slots
  }

  export interface PearFormProps {
    disabled?: boolean
    inline?: boolean
    labelWidth?: number | string | undefined
    labelAlign?: 'left' | 'right'
    labelPlacement?: 'left' | 'top'
    rules?: FormRules
    showFeedback?: boolean
    showLabel?: boolean
    showRequireMark?: boolean
    requireMarkPlacement?: 'left' | 'right'
    size?: 'small' | 'medium' | 'large'
    // basic
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

  // export interface PearFormEmit {
  //   (e: 'register', props: Ref<Partial<PearFormProps>>): void
  // }

  export interface PearFormExpose {
    register: (formProps: Partial<PearFormProps>) => void
    getFormValue: () => Recordable
    setFormProps: (formProps?: Partial<PearFormProps>) => void
    updFormValue: (updModel: Recordable) => void
    restoreValidation: () => void
  }

  const attrs = useAttrs()
  // const emit = defineEmits<PearFormEmit>()

  const props = withDefaults(defineProps<PearFormProps>(), {
    disabled: false,
    inline: false,
    labelPlacement: 'top',
    showFeedback: true,
    showLabel: true,
    requireMarkPlacement: 'right',
    size: 'medium',
    schemas: () => [],
    gridProps: () => ({
      cols: 3,
      collapsed: false,
      collapsedRows: 1,
      responsive: 'screen',
      itemResponsive: false,
      xGap: 12,
      yGap: 0
    })
  })

  const innerProps = ref<Partial<PearFormProps>>({})

  const proxyProps = computed((): PearFormProps => {
    return merge({}, props, innerProps.value)
  })

  // inner form refEl
  const innerFormRefEl = ref<Nullable<HTMLElement & typeof NForm>>(null)

  // form modelRef
  const {
    formModelRef,
    methods: { restFormValue }
  } = usePearFormModel(proxyProps)

  const bindFormProps = computed(() => {
    return {
      ...omit(proxyProps, 'model', 'schemas', 'gridProps'),
      ...attrs,
      model: formModelRef.value
    }
  })

  defineExpose<PearFormExpose>({
    register: (props) => {
      innerProps.value = props
    },
    getFormValue: (): Recordable => {
      return formModelRef.value
    },
    setFormProps: (formProps) => {
      formProps && (innerProps.value = formProps)
    },
    updFormValue: (updModel: Recordable): void => {
      formModelRef.value = merge(formModelRef.value, updModel)
    },
    restoreValidation: () => {
      innerFormRefEl.value?.restoreValidation()
      restFormValue()
    }
  })
</script>

<template>
  <NForm ref="innerFormRefEl" :model="formModelRef" v-bind="bindFormProps">
    <NGrid v-bind="proxyProps.gridProps">
      <NFormItemGi
        v-for="schema in proxyProps.schemas"
        :key="schema.model"
        :path="schema.model"
        v-bind="schema?.formItemProps ? schema.formItemProps : {}"
      >
        <PearFormItem :schema="schema" :form-model-ref="formModelRef" />
      </NFormItemGi>
      <NFormItemGi v-if="$slots.formAction" suffix>
        <NSpace justify="end">
          <slot name="formAction"></slot>
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<style scoped lang="less"></style>
