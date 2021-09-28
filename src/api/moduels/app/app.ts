import { useApi } from '@/api/http'
import { Ref } from 'vue'
import { CaptureModel, CaptureParams, LoginForm } from '@/api/moduels/app/dataModel/appModel'

export enum Api {
  GetCapture = '/user/getCapture',
  Login = '/user/login'
}

export const getCapture = (params: CaptureParams) => {
  return useApi(Api.GetCapture, {
    method: 'get',
    params
  })
}

export const login = (data: Ref<LoginForm>) => {
  return useApi<CaptureModel>(
    Api.Login,
    {
      method: 'post',
      data
    },
    { immediate: false }
  )
}
