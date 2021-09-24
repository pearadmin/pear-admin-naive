import request from '@/api/umi-fetch'

export const testApi = () => {
  return request('/enums/all',{
    method: 'post',
    data: {
      timestamp: new Date().getTime()
    }
  })
}
