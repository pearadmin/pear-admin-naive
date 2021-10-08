import { Options } from 'ky/distribution/types/options'
import { InstanceFetchConfig } from '@/api/http/type'
import { createDialog } from '@/api/http/createDialog'

export const fetchConfig: Options = {
  prefixUrl: import.meta.env.VITE_FETCH_PREFIX_URL,
  timeout: 6 * 1000,
  headers: {
    credentials: 'omit' // detail msg in the RequestCredentials
  },
  throwHttpErrors: false,
  hooks: {
    // beforeRetry: [
    //   (state) => {
    //     console.log(state)
    //   }
    // ],
    beforeRequest: [
      (request) => {
        const token = 'abcdfef'
        if (token) {
          request.headers.set('token', token)
        }
        return request
      }
    ],
    // beforeRetry: [(beforeRetryState) => {}],
    afterResponse: [
      async (_, options, response) => {
        // if (!response.ok) {
        //   window.$notification.error({
        //     content: '网络连接异常',
        //     meta: '请稍后重试!'
        //   })
        // }
        const cloneResponse = response.clone()
        const responseData = await cloneResponse.json()

        const { code, msg } = responseData
        if (code === -1) {
          const { showErrorType = 'Message' } = options as InstanceFetchConfig
          switch (showErrorType) {
            default:
              window.$message.error(msg)
              break
            case 'Dialog':
              createDialog({
                type: 'error',
                title: '提示',
                content: msg,
                duration: 3000
              })
              break
            case 'Notification':
              window.$notification.error({
                title: '提示',
                duration: 3000,
                content: msg
              })
              break
          }
        }

        return response
      }
    ]
  }
}
