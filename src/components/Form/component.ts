import {
  NFormItem,
  NFormItemGi,
  NInput,
  NSelect,
  NCheckbox,
  NRadio,
  NSwitch
} from 'naive-ui'

export type ComponentMap = Map<string, unknown>

const map: ComponentMap = new Map()

map.set(NFormItem.name, NFormItem)
map.set(NFormItemGi.name, NFormItemGi)
map.set(NInput.name, NInput)
map.set(NSelect.name, NSelect)
map.set(NCheckbox.name, NCheckbox)
map.set(NRadio.name, NRadio)
map.set(NSwitch.name, NSwitch)
