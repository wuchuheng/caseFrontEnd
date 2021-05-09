import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import Observable from 'zen-observable';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DocumentNode } from 'graphql/language/ast';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  loading = false

  constructor(
    private apollo: Apollo,
    private message: NzMessageService
  ) { }

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
          this.message.create('error', err.message)
          this.loading = false
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
        this.message.create('error', err.message)
        this.loading = false
        ob.error(err)
      })
    })
  }
}
