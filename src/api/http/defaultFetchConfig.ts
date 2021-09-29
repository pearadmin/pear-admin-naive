import { Options } from 'ky/distribution/types/options'
export const defaultFetchConfig: Options = {
  prefixUrl: import.meta.env.VITE_FETCH_PREFIX_URL,
  timeout: 6 * 1000,
  headers: {
    credentials: 'omit' // detail msg in the RequestCredentials
  },
  hooks: {
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
      async (_, __, response) => {
        if (!response.ok) {
          window.$message.error('网络错误, 请稍后重试！')
        }
        const cloneResponse = response.clone()
        const responseData = await cloneResponse.json()

        const { code, msg } = responseData
        if (code === -1) {
          window.$message.error(msg)
        }

        return response
      }
    ]
  }
}
