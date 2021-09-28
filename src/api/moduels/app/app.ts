import { useApi } from '@/api/http'
import { CaptureModel } from '@/api/moduels/app/dataModel/appModel'

export enum Api {
  GetCapture = '/user/getCapture',
  Login = '/user/login'
}

export const getCapture = (params) => {
  return useApi(Api.GetCapture, {
    method: 'get',
    params
  })
}

export const login = (data) => {
  return useApi<CaptureModel>(Api.Login, {
    method: 'post',
    data
  }, { immediate: false })
}
