declare namespace GrapqlType {
  export type LoginResType = {
    accessToken: string
    expiredAt: number
  }
  export type LoginParamsType = {
    username: string
    password: string
  }
  export type UploadParamType = {
    name: string
    fileBase64: string
  }
  export type UploadFileResType = {
    id: number
    size: number
    version: string
    icon: string
    label: string
    path: string
  }
}
