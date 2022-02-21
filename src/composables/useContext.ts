import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref, UnwrapRef } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import { merge } from 'lodash-es'

export type UpdateProvideState<T> = (payload: Partial<MaybeRef<T>>) => void

export function createContext<T>(
  injectKey: InjectionKey<MaybeRef<T>>,
  payload: MaybeRef<T>,
  updStateInjectKey?: InjectionKey<UpdateProvideState<T>>
) {
  const innerState = ref<T>({ ...get(payload) })

  provide<Ref<UnwrapRef<T>>>(injectKey, innerState)

  function updProvideState<T>(payload: Partial<MaybeRef<T>>): void {
    merge(innerState.value, payload)
  }

  if (updStateInjectKey) {
    provide<UpdateProvideState<T>>(updStateInjectKey, updProvideState)
  }

  return {
    innerState,
    updProvideState
  }
}

export function useContext<T>(key: InjectionKey<T>): T {
  return inject<T>(key) as T
}
