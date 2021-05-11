import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import Observable from 'zen-observable';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DocumentNode } from 'graphql/language/ast';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  loading = false

  constructor(
    private apollo: Apollo,
    private message: NzMessageService,
    private router: Router
  ) { }

  errorHandle(err: GraphqlError): void
  {
    this.message.create('error', err.message)
    this.loading = false
    const errorCode = Number(err.graphQLErrors[0].extensions.code)
    // 定向到登录页面
    if (errorCode === 50000) {
      setTimeout(() => this.router.navigateByUrl('/admin/login'), 1000)
    }
  }

  /**
   * 更改操作
   * @param graphql
   * @param variables
   */
  mutation<T>(graphql: DocumentNode, variables: Record<string, any> = {}): Observable<T>
  {
    return new Observable(ob => {
      this.loading = true
      this.apollo.mutate<T>({
        mutation: graphql,
        variables
      }).subscribe(({ data }) => {
        this.loading = false
        ob.next(data as T)
      },
        err => {
          this.errorHandle(err)
          ob.error(err)
        })
    })
  }

  query<T>(graphql: DocumentNode, variables: Record<string, any> = {}): Observable<T>
  {
    this.loading = true
    return new Observable<T>(ob => {
      this.apollo.query<T>({
        query: graphql,
        variables
      }).subscribe(({data}) => {
        this.loading = false
        ob.next(data as T)
      }, err => {
        console.log(err)
        debugger
        this.errorHandle(err)
        ob.error(err)
      })
    })
  }
}

class GraphqlError extends Error{
  graphQLErrors: {extensions: {code: string}}[] = []
}
