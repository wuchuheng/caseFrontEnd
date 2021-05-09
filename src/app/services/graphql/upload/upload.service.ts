import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {GraphqlService} from '../graphql.service';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs';
import {fileToBase64} from '@wuchuhengtools/helper';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private apollo: Apollo,
    private graphql: GraphqlService,
  ) { }

  singleUpload(file: File): Observable<number>
  {
    const UPLOAD_GRAPHQL = gql`
      mutation UploadMutation($name: String!, $fileBase64: String!) {
        upload(name: $name, fileBase64: $fileBase64)
      }
    `
    return new Observable<number>(ob => {
      fileToBase64(file).then(fileBase64 => {
        const params: GrapqlType.UploadParamType = {
          name: file.name,
          fileBase64
        }
        this.graphql.mutation<any>(UPLOAD_GRAPHQL, params).subscribe(({ data }) => {
          ob.next(data)
        }, err => ob.error(err))
      })
    })
  }
}
