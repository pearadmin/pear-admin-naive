import { NInput, NSelect, NCheckbox, NRadio, NSwitch, NDatePicker } from 'naive-ui'

export type ComponentMap = Map<string, unknown>

const map: ComponentMap = new Map()

map.set('NInput', NInput)
map.set('NSelect', NSelect)
map.set('NCheckbox', NCheckbox)
map.set('NRadio', NRadio)
map.set('NSwitch', NSwitch)
map.set('NDatePicker', NDatePicker)

export { map as componentMap }
