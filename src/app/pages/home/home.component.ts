import { Component, OnInit } from '@angular/core';
import {CasesService} from '../../services/graphql/cases/cases.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageInfo: GrapqlType.CaseParamsType = {
    page: 1,
    pageSize: 12,
    keyword: ''
  }
  pageData: GrapqlType.CaseResType = {
    total: 0,
    items: []
  }
  loading = false

  constructor(
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    this.getCase(this.pageInfo)
  }

  getCase(params: GrapqlType.CaseParamsType): void
  {
    this.loading = true
    this.caseService.getCase(params).subscribe(res => {
      this.loading = false
      this.pageData = res.cases
    })
  }
}
