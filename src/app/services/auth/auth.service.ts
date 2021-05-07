import { Injectable } from '@angular/core';

const ACCESS_TOKEN_KEY = 'admin_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(parmas: GrapqlType.LoginResType): void
  {
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(parmas))
  }

  getToken(): string
  {
    const { accessToken } = JSON.parse(localStorage.getItem(ACCESS_TOKEN_KEY) as string) as GrapqlType.LoginResType
    return accessToken
  }

  isValidToken(): boolean
  {
    if (localStorage.getItem(ACCESS_TOKEN_KEY) === null) {
      return false
    }
    const { expiredAt } = JSON.parse(localStorage.get(ACCESS_TOKEN_KEY)) as GrapqlType.LoginResType
    return Number(expiredAt) * 1000 <= Date.now() ?  false : true
  }
}
