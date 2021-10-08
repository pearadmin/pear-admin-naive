import { Options } from 'ky/distribution/types/options'
import { MaybeRef } from '@vueuse/core'
import { ComputedRef, Ref, UnwrapRef } from 'vue'

export interface InstanceFetchConfig extends Options {
  /**
   * post 请求数据body对象
   */
  data?: Options['json'] | Recordable
  /**
   * get 请求数据参数对象
   */
  params?: Options['searchParams'] | Recordable
  /**
   * 返回的数据的方式
   * fetch请求后需要链式调用 [transform]() 对应的方法， 默认调用.json()返回json对象
   */
  transform?: 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text'
  showErrorType?: 'Message' | 'Dialog' | 'Notification'
}

export interface HookConfig<T> {
  /**
   * 初始化data: default null
   */
  initialData?: MaybeRef<T>
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

export interface UseApiReturnType<T> {
  /**
   * 请求状态
   */
  loading: Ref<boolean>
  /**
   * 请求是否完成
   */
  finished: Ref<boolean>
  /**
   * 返回的数据类型
   */
  data: Ref<UnwrapRef<T> | null>
  // data: Ref<T | null>
  /**
   * 执行函数
   */
  execute: ComputedRef<() => Promise<unknown>>
}
