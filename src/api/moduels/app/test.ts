import { useApi } from '@/api/http/useApi'

export const apiTest = (params) => {
  return useApi({
    url: '/user/getCapture',
    method: 'get',
    // data,
    params
  })
}
