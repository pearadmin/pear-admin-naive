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
  model: string
  component?: ComponentName
  componentProps?: Recordable
  componentSlots?: (() => Slots | HTMLElement) | Slots
  formItemProps?: Recordable
  wrapperProps?: {
    offset?: number
    span?: number
    suffix?: boolean
  }
  // maybe not need
  wrapperSlots?: (() => Slots | HTMLElement) | Slots
}
