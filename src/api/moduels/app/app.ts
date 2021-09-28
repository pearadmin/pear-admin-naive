import { useApi } from '@/api/http'

export enum Api {
  GetCapture = '/user/getCapture',
  Login = '/user/login'
}

export const getCapture = (params: Recordable) => {
  return useApi(Api.GetCapture, {
    method: 'get',
    params
  })
}

export const login = (data: Recordable) => {
  return useApi(Api.Login, {
    method: 'post',
    data
  }, { immediate: false })
}
