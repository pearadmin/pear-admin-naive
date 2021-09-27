import { Options } from 'ky/distribution/types/options'

export interface UserFetchConfig {
  transform?: 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
  showErrorType?: 'Modal' | 'Notification'
}

export interface DefaultFetchOptions extends Options {
  data?: Options['json']
  params?: Options['searchParams']
  initialValue: any
}
