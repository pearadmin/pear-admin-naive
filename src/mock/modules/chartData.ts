import type { MockMethod } from 'vite-plugin-mock'
import { createResponseData } from '../mockUtil'
import data from './gdp.json'

export default [
  {
    url: '/dashboard/getGDP',
    method: 'get',
    response: () => {
      return createResponseData({
        data
      })
    }
  }
] as MockMethod[]
