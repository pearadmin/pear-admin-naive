interface ResponseData {
  code?: number
  success?: boolean
  msg?: string
  data?: unknown
  timestamp?: number
}
export function createResponseData (responseData: ResponseData): ResponseData {
  return Object.assign({}, {
    code: 0,
    success: true,
    msg: '',
    data: null,
    timestamp: new Date().getTime()
  }, responseData)
}
