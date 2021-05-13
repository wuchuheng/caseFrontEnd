import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphqlService} from '../graphql.service';
import {gql} from '@apollo/client/core';
import {Observable, Observer, Subject} from 'rxjs';

type ListResType = { categories: GrapqlType.CategoriesType }

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categorySubject = new Subject<ListResType>()

  constructor(
    private apollo: Apollo,
    private graphql: GraphqlService
  ) { }


  getCategories(): void
  {
    const queryCategoriesGql = gql`
      query {
        categories{
          id
          name
        }
      }
    `
    this.graphql.query<ListResType>(queryCategoriesGql).subscribe(
      res => { this.categorySubject.next(res) }
    )
  }

  update(category: GrapqlType.CategoryType): Observable<ListResType>
  {
    const UPDATE_GRAPHQL = gql`
      mutation updateCategory($id: ID! $name: String!) {
        updateCategory(id: $id name: $name) {
          id
          name
        }
      }
    `
    return new Observable<ListResType>(rx => {
      this.graphql.mutation<ListResType>(UPDATE_GRAPHQL, category).subscribe(res => {
        this.apollo.client.clearStore().then(() => this.getCategories())
        rx.next(res)
      })
    })
  }

  create(name: string): Observable<ListResType>
  {
    const CREATE_GRAPHQL = gql`
      mutation createCategory($name: String!) {
        createCategory(name: $name) {
          id
          name
        }
      }
    `
    return new Observable<ListResType>(rx => {
      this.graphql.mutation<ListResType>(CREATE_GRAPHQL, {name}).subscribe(res => {
        this.apollo.client.clearStore().then(() => this.getCategories())
        rx.next(res)
      })
    })
  }
}
