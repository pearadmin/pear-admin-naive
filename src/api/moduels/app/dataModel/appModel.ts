export interface CaptureModel {
  code: string
  key: string
}

export interface CaptureParams {
  timestamp: number
}

export interface LoginForm {
  username: string
  password: string
  captchaCode: string
}
