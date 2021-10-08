import { defineComponent } from 'vue'
import { useNotification, useMessage, useDialog } from 'naive-ui'

/**
 * message
 */
export const OuterMessage = defineComponent({
  setup() {
    window.$message = useMessage()
    return () => null
  }
})

/**
 * notification
 */
export const OuterNotification = defineComponent({
  setup() {
    window.$notification = useNotification()
    return () => null
  }
})

/**
 * dialog | modal
 */
export const OuterDialog = defineComponent({
  setup() {
    const dialog = useDialog()
    window.$dialog = dialog
    return () => null
  }
})
