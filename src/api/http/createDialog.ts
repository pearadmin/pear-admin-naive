import type { DialogOptions } from 'naive-ui'

interface CreateDialog extends DialogOptions {
  duration?: number
}

/**
 * dialog duration
 * @param options
 */
export function createDialog(options: CreateDialog) {
  if (window['dialogInstance']) {
    clearTimeout(window['dialogInstance'])
  }
  window.$dialog.create(options)
  if (options.duration) {
    window['dialogInstance'] = setTimeout(() => {
      window.$dialog.destroyAll()
    }, options.duration)
  }
}
