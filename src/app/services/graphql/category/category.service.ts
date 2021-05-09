import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphqlService} from '../graphql.service';
import Observable from 'zen-observable';
import {gql} from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private apollo: Apollo,
    private graphql: GraphqlService
  ) { }

  getCategories(): Observable<{categories: GrapqlType.CategoriesType}>
  {
    const queryCategoriesGql = gql`
      query {
        categories{
          id
          name
        }
      }
    `
    return this.graphql.query<{categories: GrapqlType.CategoriesType}>(queryCategoriesGql)
  }
}
