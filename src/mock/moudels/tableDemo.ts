import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'
import { createResponseData } from '../mockUtil'

const data: Recordable[] = Mock.mock({
  'array|1-100000': ['Hello', 'Mock.js', '!']
})
const getCurrentPage = (pageNo, pageSize) => {
  console.log(data)
  data.slice((pageNo - 1) * pageSize, pageNo * pageSize)
}
export default [
  {
    url: '/demo/table/getTableRecords',
    method: 'post',
    response: ({ body }) => {
      const { pageSize, pageNo } = body
      const obj = Mock.mock({
        "age|1-100": 100,
        "rate|1-10": "★",
        "status|1-2": true,
        data: Mock.mock('@date("MM-dd")'),
        createTime: Random.datetime(),
        avatar: Random.dataImage('200x200')
      })
      const data = {
        list: getCurrentPage(pageNo, pageSize),
        total: 100000,
        pageSize,
        pageNo
      }
      return createResponseData({
        data
      })
    }
  }
] as MockMethod[]
