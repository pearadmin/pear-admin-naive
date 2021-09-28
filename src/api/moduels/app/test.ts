import { useApi } from '@/api/http/useApi'

export const apiTest = (params) => {
  return useApi('/user/getCapture', {
    method: 'get',
    // data,
    params
  })
}
