import { defineComponent } from 'vue'
import { useMessage, useNotification } from 'naive-ui'
export default defineComponent({
  name: 'Interaction',
  setup() {
    const message = useMessage()
    const notification = useNotification()
    if (window) {
      window.$message = message
      window.$notification = notification
    }
    return () => null
  }
})
