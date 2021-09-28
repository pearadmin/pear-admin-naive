import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import { NotificationApiInjection } from 'naive-ui/lib/notification/src/NotificationProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
    $notification: NotificationApiInjection
  }
}
