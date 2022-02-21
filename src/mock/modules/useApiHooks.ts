import type { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'
import { createResponseData } from '../mockUtil'

const getDemoData = (): Recordable => {
  return Mock.mock({
    'age|1-100': 100,
    'rate|1-5': '★',
    'status|1-2': true,
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

export default [
  {
    url: '/demo/use/api/getDemoData',
    method: 'post',
    response: ({ body }) => {
      const data = {
        ...getDemoData(),
        fetchData: body
      }
      return createResponseData({
        data
      })
    }
  }
] as MockMethod[]
