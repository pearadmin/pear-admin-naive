import type { RequestOptionsInit } from 'umi-request'
import { createDialog } from '@/api/http/createDialog'

export function requestInterceptor(url: string, options: RequestOptionsInit) {
  // todo
  const token = sessionStorage.getItem('token')
  if (token) {
    const header = new Headers()
    header.set('token', token)
    options.headers = {
      ...options.headers,
      ...header
    }
  }
  return {
    url,
    options
  }
}

// response拦截器, 处理response
export async function responseInterceptor(response, options) {
  const data = await response.clone().json()
  const { code, msg } = data
  if (code === -1) {
    const { showErrorType = 'Message' } = options
    switch (showErrorType) {
      default:
        window.$message.error(msg)
        break
      case 'Dialog':
        createDialog({
          type: 'error',
          title: '提示',
          content: msg,
          duration: 3000
        })
        break
      case 'Notification':
        window.$notification.error({
          title: '提示',
          duration: 3000,
          content: msg
        })
        break
    }
  }

  if (options.showErrorType) {
  }
  return response
}

export function errorHandler(error) {
  const codeMap = {
    '500': '哦豁~服务器熄火啦',
    '404': '哦豁~啥都没有找到'
  }
  if (error.response) {
    // 请求已发送但服务端返回状态码非 2xx 的响应
    console.log(codeMap[error.data.status])
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    window.$notification.error({
      title: 'Emmm',
      duration: 3000,
      content: '哦豁~网络好像有点小毛病哦'
    })
  }
  throw error
}
