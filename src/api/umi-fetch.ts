import { extend } from 'umi-request'
// import { stringify } from 'querystring'

// const prefixUrl = configs[API_ENV].API_SERVER
const prefixUrl = import.meta.env.VITE_BASIC_FETCH_URL
// console.log(prefixUrl)

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText
    const { status, url } = response
    // notification.error({
    //   message: `请求错误 ${status}: ${url}`,
    //   description: errorText,
    // })
  } else if (!response) {
    // notification.error({
    //   description: '您的网络发生异常，无法连接服务器',
    //   message: '网络异常',
    // })
  }

  return response
}
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  prefix: prefixUrl,
  timeout: 10 * 10000,
  credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Plat-Code': 'BIC'
  }
})

request.interceptors.request.use((url, options) => {
  // console.log(url)
  const token = localStorage.getItem('token') || ''
  if (url.indexOf('login') === -1) {
    options.headers = {
      ...options.headers,
      token
    }
  }
  return { url, ...options }
})

const resolveResponse = async (response) => {
  const data = await response.clone().json()
  const { code, msg } = data
  if (code === 'SS0002') {
    localStorage.clear()
    // let redirect = stringify({
    //   redirect: window.location.href
    // })
    // location.href = `/user/login?${redirect}`
    return null
  } else if (code && code !== 'S00000') {
    // message.error(msg)
    return response
  } else {
    return response
  }
}
request.interceptors.response.use(async (response, options) => {
  const contentType = response.headers.get('content-type') as string
  if (contentType.includes('json')) {
    return await resolveResponse(response)
  } else {
    try {
      const type = response.headers.get('Content-Type') as string
      let fileName = response.headers.get('Content-Disposition') as string
      const res = await response.blob()
      let binaryData = [res]
      if (fileName.includes('attachment')) {
        fileName = fileName.substr(fileName.indexOf('filename=') + 9, fileName.length)
      }
      let blob = new Blob(binaryData, { type })
      let downloadElement = document.createElement('a')
      let href = window.URL.createObjectURL(blob)
      downloadElement.href = href
      downloadElement.download = decodeURI(fileName)
      document.body.appendChild(downloadElement)
      downloadElement.click()
      document.body.removeChild(downloadElement)
      window.URL.revokeObjectURL(href)
      return null
    } catch (e) {
      console.log(e)
      return await resolveResponse(response)
    }
  }
})

console.log(request)
debugger

export default request
