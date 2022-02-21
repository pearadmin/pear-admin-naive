import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import system from './modules/system'
import table from './modules/tableDemo'
import useApi from './modules/useApiHooks'
import chartData from './modules/chartData'
import { createFetchSever } from '@/mock/createFetchSever'

const modules = [...system, ...table, ...useApi, ...chartData]

export function setupProdMockServer() {
  createProdMockServer(modules)
  createFetchSever(modules)
}
