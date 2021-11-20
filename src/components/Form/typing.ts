import { FormItemProps, FormItemGiProps } from 'naive-ui'
import { Slots } from 'vue'

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
  component?: ComponentName
  componentProps?: Recordable
  componentSlots?: (() => Slots | HTMLElement) | Slots
  field: string
  wrapperProps?: Recordable
  // maybe not need
  wrapperSlots?: (() => Slots | HTMLElement) | Slots
}
