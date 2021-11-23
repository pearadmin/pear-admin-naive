import { useApi } from '@/api/http'
import { Ref } from 'vue'
import {
  CaptureModel,
  CaptureParams,
  LoginForm,
  LoginResData
} from './dataModel/appModel'

export enum Api {
  GetCapture = '/user/getCapture',
  Login = '/user/login'
}

export const getCapture = (params: CaptureParams) => {
  return useApi<CaptureModel>(Api.GetCapture, {
    method: 'get',
    params
  })
}

export const login = (data: Ref<LoginForm>) => {
  return useApi<LoginResData>(
    Api.Login,
    {
      method: 'post',
      data,
      showErrorType: 'Dialog'
    },
    { immediate: false }
  )
}
