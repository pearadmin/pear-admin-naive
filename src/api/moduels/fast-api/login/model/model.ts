import type { BasicModel } from '@/api/moduels/basicModel'

export interface LoginModel {
  username: string
  password: string
}

export interface LoginResData extends BasicModel {
  token: string
  userinfo: {
    USERID: number | string
    USERNAME: string
  }
}
