export interface LoginModel {
  username: string
  password: string
}

export interface LoginResData {
  token: string
  userinfo: {
    USERID: number | string
    USERNAME: string
  }
}
