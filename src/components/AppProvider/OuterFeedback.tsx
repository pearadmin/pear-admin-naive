import { defineComponent } from 'vue'
import { useNotification, useMessage } from 'naive-ui'

export const OuterMessage = defineComponent({
  setup() {
    window.$message = useMessage()
    return () => null
  }
})

export const OuterNotification = defineComponent({
  setup() {
    window.$notification = useNotification()
    return () => null
  }
})
