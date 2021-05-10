const ACCESS_TOKEN_KEY = 'admin_token'

export const setToken = (parmas: GrapqlType.LoginResType): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(parmas))
}

export const getToken = (): string => {
  const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) as string) as GrapqlType.LoginResType
  return accessToken
}

export const isValidToken = (): boolean => {
  if (localStorage.getItem(ACCESS_TOKEN_KEY) === null) {
    return false
  }
  const { expiredAt } = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) as string) as GrapqlType.LoginResType
  return Number(expiredAt) * 1000 > Date.now()
}
