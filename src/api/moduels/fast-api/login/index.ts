import { useApi } from '@/api/http'
import { Ref } from 'vue'
import { LoginModel, LoginResData } from '@/api/moduels/fast-api/login/model/model'

enum Api {
  userLogin = 'user/login/'
}

export const useLogin = (data: Ref<LoginModel>) => {
  return useApi<LoginResData>(
    {
      url: Api.userLogin,
      data,
      method: 'post',
      showErrorType: 'Notification'
    },
    { immediate: false }
  )
}
