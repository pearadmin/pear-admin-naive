import { useApi } from '@/api/http'
import type { Ref } from 'vue'
import type { CaptureModel, CaptureParams, LoginForm, LoginResData } from './dataModel/appModel'

export enum Api {
  GetCapture = '/user/getCapture',
  Login = '/user/login'
}

export const getCapture = (params: CaptureParams) => {
  return useApi<CaptureModel>({
    url: Api.GetCapture,
    method: 'get',
    params
  })
}

export const login = (data: Ref<LoginForm>) => {
  return useApi<LoginResData>(
    {
      url: Api.Login,
      method: 'post',
      data,
      showErrorType: 'Dialog'
    },
    { immediate: false }
  )
}
