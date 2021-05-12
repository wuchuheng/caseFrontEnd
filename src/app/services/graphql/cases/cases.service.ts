import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import {GraphqlService} from '../graphql.service';
import {gql} from '@apollo/client/core';
import Observable from 'zen-observable';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

type CaseResType = {cases: GrapqlType.CaseResType; summary: GrapqlType.Summary}
type GetCaseByIdResType = {case: GrapqlType.OneCaseResType}
@Injectable({
  providedIn: 'root'
})
export class CasesService {
  caseSubject = new Subject<CaseResType>()

  constructor(
    private apollo: Apollo,
    private graphql: GraphqlService
  ) { }

  create(params: GrapqlType.CreateCaseParamsType): Observable<GrapqlType.CreateCaseResType>
  {
    const graphql = gql`
      mutation createCase(
        $id: Int!,
        $label: String!,
        $bannerFileIds: [Int!]!,
        $category: Int!,
        $coverFileId: Int!,
        $desc: String!,
        $detailFileId: Int!,
        $iconFileId: Int!,
        $remark: String!,
      ) {
        create(
          id: $id,
          label: $label,
          bannerFileIds: $bannerFileIds,
          category: $category,
          coverFileId: $coverFileId,
          desc: $desc,
          detailFileId: $detailFileId,
          iconFileId: $iconFileId,
          remark: $remark
        )
      }
    `
    return this.graphql.mutation<GrapqlType.CreateCaseResType>(graphql, params)
  }

  getCase(params: GrapqlType.CaseParamsType): void
  {
    const graphql = gql`
      query getCases($page: Int!, $pageSize: Int!, $keyword: String!, $categoryId: Int!) {
        cases(page: $page, pageSize: $pageSize, keyword: $keyword, categoryId: $categoryId) {
          total
          items {
            id
            uid
            label
            version
            icon{id url}
            type
            file{id url}
            cover{id url}
            banner{id, url}
            detail {id url}
            desc
            remark
            size
            categoryId
          }
        }
        summary{
          total
          android
          ios
        }
      }
    `
    this.graphql.query<CaseResType>(graphql, params).subscribe(res => {
      this.caseSubject.next(res)
    })
  }

  getCaseById(id: number): Observable<GetCaseByIdResType>
  {
    const graphQl = gql`
      query queryCase ($id: Int!){
        case(id: $id) {
          label
          icon {url}
          remark
          desc
          detail {url}
          file {id url}
        }
      }
    `

    return this.graphql.query<GetCaseByIdResType>(graphQl, {id})
  }

  updateCase(params: GrapqlType.UpdateCaseParamsType): Observable<GrapqlType.CaseType>
  {
    const graphql = gql`
      mutation updateCaseMudation(
        $id: Int!
        $label: String!
        $iconFileId:Int!
        $coverFileId: Int!
        $bannerFileIds: [Int]!
        $desc: String!
        $remark: String!
      ) {
        updateCase(
          id: $id
          label: $label
          iconFileId: $iconFileId
          coverFileId: $coverFileId
          bannerFileIds: $bannerFileIds
          desc: $desc
          remark: $remark
        ) {
          id
          uid
          label
          version
          size
          icon {id url}
          type
          file {id url}
          cover {id url}
          banner {id url}
          detail {id url}
          desc
          remark
          categoryId
        }
      }
    `
    return new Observable<GrapqlType.CaseType>(rx => {
      this.graphql.mutation<GrapqlType.CaseType>(graphql, params).subscribe(res => {
        res.id = params.id
        rx.next(res)
      })
    })
  }
}
