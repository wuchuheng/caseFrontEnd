import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import Observable from 'zen-observable';
import { GraphqlService } from '../graphql.service';
import {setToken} from '../../../utils/auth';

type LoginResType = { login: GrapqlType.LoginResType }
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apollo: Apollo,
    private graphql: GraphqlService,
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
        setToken(res.login)
        ob.next(res)
      }, err => ob.error(err))
    })
  }
}
