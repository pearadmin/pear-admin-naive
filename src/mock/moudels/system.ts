import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'
import { createResponseData } from '../mockUtil'

export default [
  {
    url: '/user/login',
    method: 'post',
    response: ({ body }) => {
      const data = {
        userInfo: {
          username: body.username,
          password: body.password
        },
        token: Math.random().toString(32).substr(3),
        routes: [],
        permissions: []
      }
      if (body.username !== 'admin' || body.password !== 'admin') {
        return createResponseData({
          code: -1,
          msg: '账号或密码不正确',
          success: false
        })
      }
      return createResponseData({
        data
      })
    }
  },
  {
    url: '/user/getCapture',
    method: 'get',
    response: (req) => {
      const value = Mock.mock({ regexp: /[a-zA-Z0-9]{4}/ }).regexp
      return {
        code: 0,
        data: {
          image: Random.image('100x38', Mock.mock('@color'), value),
          code: value
        }
      }
    }
  },
  // {
  //   url: '/api/post',
  //   method: 'post',
  //   timeout: 2000,
  //   response: {
  //     code: 0,
  //     data: {
  //       name: 'vben'
  //     }
  //   }
  // },
  // {
  //   url: '/api/text',
  //   method: 'post',
  //   rawResponse: async (req, res) => {
  //     let reqbody = ''
  //     await new Promise((resolve) => {
  //       req.on('data', (chunk) => {
  //         reqbody += chunk
  //       })
  //       req.on('end', () => resolve(undefined))
  //     })
  //     res.setHeader('Content-Type', 'text/plain')
  //     res.statusCode = 200
  //     res.end(`hello, ${reqbody}`)
  //   }
  // }
] as MockMethod[]
