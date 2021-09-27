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
      (_, __, response) => {
        return response
      }
    ]
  }
}
