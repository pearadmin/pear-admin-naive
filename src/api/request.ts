import { createFetch, MaybeRef, useFetch, UseFetchOptions } from '@vueuse/core'
import { getFetchInstance } from '@/api/appFetch'
import { Recordable } from 'vite-plugin-mock'

type Fetch = typeof useFetch

type RequestMethods = 'post' | 'get' | 'put' | 'delete'


type RequestReturnType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'

interface CreatConfig {
  url: MaybeRef<string>,
  method: RequestMethods,
  data?: MaybeRef<Recordable>,
  params?: MaybeRef<Recordable>,
  type?: RequestReturnType
}
export function createRequest (config: CreatConfig,  fetchConfig: UseFetchOptions) {
  const fetch = getFetchInstance()
  const { url, method = 'post', type = 'json' } = config
  const response = fetch(url, {
    method
  })[type]()
}

function setHeaderToken (options: RequestInit) {
  const token = 'token'
  if (token) {
    options.headers = {
      ...options.headers,
      token
    }
  }
}
