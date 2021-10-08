import { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'
import { NotificationApiInjection } from 'naive-ui/lib/notification/src/NotificationProvider'
import { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
    $notification: NotificationApiInjection
    $dialog: DialogApiInjection
  }
}
