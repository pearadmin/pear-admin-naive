import type { MaybeRef } from '@vueuse/core'
import type { DataTableColumns } from 'naive-ui'
import type { InjectionKey, Ref } from 'vue'
import { createContext, useContext } from '@/composables/useContext'
import type { UpdateProvideState } from '@/composables/useContext'
import type { RequestOptionsInit } from 'umi-request'

export type TableSize = 'small' | 'medium' | 'large'

export interface TableContext {
  tableSize: MaybeRef<TableSize>
  tableHeight: MaybeRef<number>
  iconSize: MaybeRef<number>
  columns: MaybeRef<DataTableColumns>
  fetchRunner: MaybeRef<(args?: RequestOptionsInit) => Promise<unknown>>
}

const tableStateKey: InjectionKey<TableContext> = Symbol()
const updTableStateKey: InjectionKey<UpdateProvideState<TableContext>> = Symbol()

export function createTableContext(payload: TableContext) {
  return createContext<TableContext>(tableStateKey, payload, updTableStateKey)
}

export function useTableContext() {
  const tableProvideState = useContext<Ref<TableContext>>(tableStateKey)
  const updTableProvideState = useContext<UpdateProvideState<TableContext>>(updTableStateKey)

  return {
    tableProvideState,
    updTableProvideState
  }
}
