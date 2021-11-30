import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'
import { createResponseData } from '../mockUtil'

const TOTAL = 50000

const getTableItem = (): Recordable => {
  return Mock.mock({
    "age|1-100": 100,
    "rate|1-5": "★",
    "status|1-2": true,
    birthday: Mock.mock('@date("MM-dd")'),
    createTime: Random.datetime(),
    avatar: Random.image('200x200', '#894FC4', '#FFF', 'png', 'avatar'),
    email: Mock.mock('@email'),
    city: Mock.mock('@county(true)'),
    zip: Mock.mock('@zip()'),
    id: Mock.mock('@id()'),
    name: Mock.mock('@cname()')
  })
}

const getTableData = (dataLength) => {
  return Array.from({ length: dataLength }, () => getTableItem())
}

// 100 / 30 = 3...10
const getCurrentPage = (pageNo, pageSize) => {
  if (pageNo * pageSize <= TOTAL) {
    return getTableData(pageSize)
  } else {
    const dataLen = (TOTAL % pageSize)
    return getTableData( dataLen)
  }
}
export default [
  {
    url: '/demo/table/getTableRecords',
    method: 'post',
    response: ({ body }) => {
      const { pageSize, pageNo } = body
      const data = {
        list: getCurrentPage(pageNo, pageSize),
        total: TOTAL,
        pageSize,
        pageNo
      }
      return createResponseData({
        data
      })
    }
  }
] as MockMethod[]
