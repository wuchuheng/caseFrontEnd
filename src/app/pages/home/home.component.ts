import { Component, OnInit } from '@angular/core';
import {CasesService} from '../../services/graphql/cases/cases.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageInfo: GrapqlType.CaseParamsType = {
    page: 1,
    pageSize: 12,
    keyword: '',
    categoryId: 0
  }
  pageData: GrapqlType.CaseResType = {
    total: 0,
    items: []
  }
  loading = false

  constructor(
    private caseService: CasesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void
  {
    this.route.queryParams.subscribe(params => {
      this.pageInfo.categoryId = Number(params.categoryId) || 0
      this.getCase(this.pageInfo)
    })
    this.caseService.caseSubject.subscribe(res => {
      this.loading = false
      this.pageData = res.cases
    })
  }

  getCase(params: GrapqlType.CaseParamsType): void
  {
    this.loading = true
    this.caseService.getCase(params)
  }
}
