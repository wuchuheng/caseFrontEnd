declare namespace GrapqlType {
  export type LoginResType = {
    accessToken: string
    expiredAt: number
  }
  export type IteratePackageVariablesType = {
    id: number
    packageId: number
  }
  export type Summary = {
    total: number
    android: number
    ios: number
  }
  export type LoginParamsType = {
    username: string
    password: string
  }
  export type UploadParamType = {
    name: string
    fileBase64: string
  }
  export type CategoryType = {
    id: number
    name: string
  }
  export type CategoriesType = CategoryType[]
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
  type FileType = {
    id: number
    url: string
  }
  export type CaseParamsType = {
    page: number
    pageSize: number
    keyword: string
    categoryId: number
  }
  export type CaseType = {
    id: number
    uid: number
    label: string
    version: string
    icon: FileType
    type: 'android' | 'ios'
    file: FileType
    cover: FileType
    banner: FileType[]
    detail: FileType
    desc: string
    remark: string
    size: number
    categoryId: number
  }
  export type UpdateCaseParamsType = {
    id: number
    label: string
    iconFileId: number
    coverFileId: number
    bannerFileIds: number[]
    desc: string
    remark: string
  }
  export type OneCaseResType = {
    label: string
    icon: {url: string}
    remark: string
    desc: string
    detail: {url: string}
    file: FileType
  }
export type CaseResType = {
  total: number
    items: CaseType[]
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

