import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'

export default [
  {
    url: '/user/login',
    method: 'post',
    response: ({ body }) => {
      return {
        code: 0,
        data: {
          name: 'pear',
          body
        }
      }
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
