import { Options } from 'ky/distribution/types/options'
import { MaybeRef } from '@vueuse/core'
import { ComputedRef, UnwrapRef } from 'vue'

export interface UserFetchConfig {
  transform?: 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
  showErrorType?: 'Modal' | 'Notification'
}

export interface DefaultCreateFetchOptions extends Options {
  data?: Options['json']
  params?: Options['searchParams']
}

export interface UseApiFetchOption extends Options {
  data?: MaybeRef<Options['json']>
  params?: MaybeRef<Options['searchParams']>
}

export interface HookConfig {
  /**
   * 初始化data: default null
   */
  initialData?: MaybeRef
  /**
   * 是否立即触发请求: default true
   */
  immediate?: boolean
  /**
   * url, get时params， post时 data 发生变化时重新请求： default false
   */
  refetch?: boolean
  /**
   * 请求报错时，是否抛出异常 ： default false[不抛异常，resolve(undefined)]
   */
  throwOnFailed?: boolean
}


export interface UseApiReturnType<T extends any> {
  /**
   * 请求状态
   */
  loading: MaybeRef<boolean>
  /**
   * 返回的数据类型
   */
  data: MaybeRef<UnwrapRef<Nullable<T>>>
  /**
   * 执行函数
   */
  execute: ComputedRef<() => Promise<unknown>>
}
