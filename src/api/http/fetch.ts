import { extend } from 'umi-request'
import { errorHandler, requestInterceptor, responseInterceptor } from './interceptors/interceptors'

const request = extend({
  prefix: import.meta.env.VITE_FETCH_PREFIX_URL as string,
  timeout: 6 * 1000 * 5,
  errorHandler
})

request.interceptors.request.use(requestInterceptor)
request.interceptors.response.use(responseInterceptor)

export default request
