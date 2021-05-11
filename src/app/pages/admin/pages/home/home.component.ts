import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CasesService} from '../../../../services/graphql/cases/cases.service';
import CaseParamsType = GrapqlType.CaseParamsType;
import {GraphqlService} from '../../../../services/graphql/graphql.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  size: 'large' | 'default' | 'small' = 'large'
  pageInfo: GrapqlType.CaseParamsType = {
    page: 1,
    pageSize: 10,
    keyword: '',
    categoryId: 0
  }

  pageData: GrapqlType.CaseResType = {
    total: 0,
    items: []
  }
  summary: GrapqlType.Summary = {
    total: 0,
    android: 0,
    ios: 0
  }
  loading = true

  constructor(
    private fb: FormBuilder,
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      appName: ['', [Validators.required]]
    })
    this.getCase(this.pageInfo)
    this.caseService.caseSubject.subscribe(res => {
        this.loading = false
        this.pageData = res.cases
        this.summary = res.summary
    })
  }

  onSubmit(): void
  {
    this.pageInfo.keyword = this.searchForm.value.appName
    this.getCase(this.pageInfo)
  }
  getCase(page: CaseParamsType): void
  {
    this.loading = true
    this.caseService.getCase(page)
  }
  onChange(page: number): void
  {
    this.pageInfo = {...this.pageInfo, page}
    this.getCase(this.pageInfo)
  }

  onCreate(data: GrapqlType.CreateCaseResType): void
  {
    this.pageInfo.page = 1
    this.getCase(this.pageInfo)
  }

  onUpdate(): void
  {
    console.log('hello')
  }
}
