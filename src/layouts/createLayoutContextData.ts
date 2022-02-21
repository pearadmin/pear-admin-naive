import type { MaybeRef } from '@vueuse/core'
import { createContext, useContext } from '@/composables/useContext'
import type { UpdateProvideState } from '@/composables/useContext'
import type { InjectionKey, Ref } from 'vue'

export interface AppTheme {
  inverted: boolean
}

export interface LayoutContextData {
  collapsed: MaybeRef<boolean>
  isMobile: MaybeRef<boolean>
  showView: MaybeRef<boolean>
  refreshRouterView: () => void
  theme: AppTheme
}

const stateKey: InjectionKey<LayoutContextData> = Symbol()
const updateStateKey: InjectionKey<UpdateProvideState<LayoutContextData>> = Symbol()

export function createLayoutContextData(payload: MaybeRef<LayoutContextData>) {
  return createContext(stateKey, payload, updateStateKey)
}

export function useLayoutContextData(): {
  provideState: Ref<LayoutContextData>
} {
  const provideState = useContext<Ref<LayoutContextData>>(stateKey)
  return {
    provideState
  }
}
