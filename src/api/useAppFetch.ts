import { createFetch } from '@vueuse/core'

const setHeaderToken = (options: RequestInit): void => {
  const token = 'token'
  if (token) {
    options.headers = {
      ...options.headers,
      token
    }
  }
}
//
const useAppFetch = createFetch({
  baseUrl: import.meta.env.VITE_BASIC_FETCH_URL,
  options: {
    async beforeFetch({ options }) {
      setHeaderToken(options)
      return { options }
    },
    afterFetch(ctx) {
      // console.log(ctx)
      return ctx.data
    }
  },
  fetchOptions: {
    mode: 'cors'
  }
})

export default useAppFetch
