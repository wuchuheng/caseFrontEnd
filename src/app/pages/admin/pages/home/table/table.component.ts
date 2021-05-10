import { Component, OnInit } from '@angular/core';
import {CasesService} from '../../../../../services/graphql/cases/cases.service';
import CaseParamsType = GrapqlType.CaseParamsType;

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit
{
  pageInfo: GrapqlType.CaseParamsType = {
    page: 1,
    pageSize: 10
  }

  pageData: GrapqlType.CaseResType = {
    total: 0,
    items: []
  }
  loading = true

  constructor(
    private caseService: CasesService
  ) { }

  ngOnInit(): void {
    this.getCase(this.pageInfo)
  }

  getCase(page: CaseParamsType): void
  {
    this.loading = true
    this.caseService.getCase(page).subscribe(res => {
      this.loading = false
      this.pageData = res.cases
      console.log(res.cases.items)
    })
  }
}
