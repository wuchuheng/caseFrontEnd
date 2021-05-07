import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import Observable from 'zen-observable';
import { AuthService } from '../../auth/auth.service';
import { GraphqlService } from '../graphql.service';

type LoginResType = { login: GrapqlType.LoginResType }
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apollo: Apollo,
    private graphql: GraphqlService,
    private auth: AuthService
  ) { }

  login(params: GrapqlType.LoginParamsType): Observable<LoginResType>
  {
    const LOGIN_GRAPH = gql`
      mutation LoginMutation($username: String! $password: String!) {
        login(username: $username, password: $password) {
          accessToken
          expiredAt
        }
      }
    `
    return new Observable<LoginResType>(ob => {
      this.graphql.mutation<LoginResType>(LOGIN_GRAPH, params).subscribe(res => {
        this.auth.setToken(res.login)
        ob.next(res)
      }, err => ob.error(err))
    })
  }
}
