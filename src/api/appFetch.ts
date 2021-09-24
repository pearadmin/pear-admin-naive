import { createFetch, useFetch } from '@vueuse/core'

type Fetch = typeof useFetch

class AppFetch {
  private static instance: AppFetch
  public fetch: Nullable<Fetch>
  private constructor() {
    this.fetch = null
    this.init()
  }

  public static getInstance() {
    if (!AppFetch.instance) {
      AppFetch.instance = new AppFetch()
    }

    return AppFetch.instance
  }

  init() {
    const that = this
    this.fetch = createFetch({
      baseUrl: import.meta.env.VITE_BASIC_FETCH_URL,
      options: {
        async beforeFetch({ options }) {
          that.setHeaderToken(options)
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
  }

  setHeaderToken(options: RequestInit) {
    const token = 'token'
    if (token) {
      options.headers = {
        ...options.headers,
        token
      }
    }
  }
}

export function getFetchInstance(): Fetch {
  return AppFetch.getInstance().fetch!
}
