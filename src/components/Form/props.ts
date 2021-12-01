import { PropType } from 'vue'
import { FormSchema } from '@/components/Form'
import { FormRules } from 'naive-ui'

export const basicFormProps = {
  schema: {
    type: Array as PropType<FormSchema[]>
  },
  // NForm
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  inline: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  labelWidth: {
    type: [String, Number] as PropType<string | number>
  },
  labelAlign: {
    type: String as PropType<'left' | 'right'>
  },
  labelPlacement: {
    type: String as PropType<'left' | 'top'>,
    default: 'top'
  },
  model: {
    type: Object as PropType<Recordable>,
    default: 'top'
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: 'top'
  },
  showFeedback: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showLabel: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  showRequireMark: {
    type: Boolean as PropType<boolean>
  },
  requireMarkPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  }
}
