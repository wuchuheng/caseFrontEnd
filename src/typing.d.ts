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
  export type CategoriesType = {
    id: number
    name: string
  }[]
  export type CreateCaseParamsType = {
    id: number
    label: string
    bannerFileIds: number[]
    category: number
    coverFileId: number
    desc: string
    detailFileId: number
    iconFileId: number
    remark: string
  }
  export type CreateCaseResType = {
    create: number
  }
}

declare namespace ApiType
{
  export type UploadApkResType = {
    iconFileId: number
    iconUrl: string
    id: number
    label: string
    size: number
    type: 'android' | 'ios'
    version: string
  }
}

