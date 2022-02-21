<script setup lang="ts">
  import type { FormItemProps, FormItemRule, GridItemProps, GridProps } from 'naive-ui'
  import type { NForm } from 'naive-ui'
  import type { Slots, Ref } from 'vue'
  import { computed, ref, useAttrs, onMounted, unref } from 'vue'
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
    formItemProps?: GridFormItemProps
    // field: string
    // maybe not need
    // wrapperSlots?: (() => Slots | HTMLElement) | Slots
  }

  export type GridFormItemProps = Partial<FormItemProps & GridItemProps> & Recordable

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
    // setup not support dynamic import types, so add any now
    gridProps?: Partial<GridProps> & any
  }

  export interface PearFormEmit {
    (e: 'register-form', expose?: PearFormExpose): void
  }

  export interface PearFormExpose {
    values: Ref<Recordable>
    updFormProps: (formProps?: Partial<PearFormProps>) => void
    getFormValue: () => Recordable
    updFormValue: (updModel: Recordable) => void
    validate: (args?: any) => Promise<any>
    restoreValidation: () => void
  }

  const attrs = useAttrs()
  const emit = defineEmits<PearFormEmit>()

  const props = withDefaults(defineProps<PearFormProps>(), {
    disabled: false,
    inline: false,
    labelPlacement: 'top',
    showFeedback: true,
    showLabel: true,
    showRequireMark: undefined,
    requireMarkPlacement: 'right',
    size: 'medium',
    schemas: () => [],
    gridProps: () =>
      ({
        cols: 3,
        collapsed: false,
        collapsedRows: 1,
        responsive: 'screen',
        itemResponsive: false,
        xGap: 12,
        yGap: 0
      } as Partial<GridProps>)
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
      ...omit(unref(proxyProps), 'model', 'schemas', 'gridProps'),
      ...attrs,
      model: unref(formModelRef)
    }
  })

  const formExpose: PearFormExpose = {
    values: formModelRef,
    getFormValue: (): Recordable => {
      return formModelRef.value
    },
    updFormProps: (formProps) => {
      formProps && merge(innerProps.value, formProps)
    },
    updFormValue: (updModel: Recordable): void => {
      formModelRef.value = merge(formModelRef.value, updModel)
    },
    validate: async (args?: any) => {
      return innerFormRefEl.value?.validate(args)
    },
    restoreValidation: () => {
      innerFormRefEl.value?.restoreValidation()
      restFormValue()
    }
  }

  onMounted(() => {
    emit('register-form', formExpose)
  })

  defineExpose<PearFormExpose>(formExpose)
</script>

<template>
  <NForm ref="innerFormRefEl" v-bind="bindFormProps">
    <NGrid v-bind="proxyProps?.gridProps ?? {}">
      <NFormItemGi
        v-for="schema in proxyProps.schemas"
        :key="schema.model"
        :path="schema.model"
        v-bind="schema?.formItemProps ?? {}"
      >
        <PearFormItem :schema="schema" :form-model-ref="formModelRef" />
      </NFormItemGi>
      <NFormItemGi v-if="$slots.formAction" suffix style="margin-left: auto">
        <NSpace justify="end">
          <slot name="formAction"></slot>
        </NSpace>
      </NFormItemGi>
    </NGrid>
  </NForm>
</template>

<style scoped lang="less"></style>
