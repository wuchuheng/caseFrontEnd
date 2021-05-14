import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CasesService} from '../../../../services/graphql/cases/cases.service';
import CaseParamsType = GrapqlType.CaseParamsType;
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzIconService} from 'ng-zorro-antd/icon';
import {environment} from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchForm!: FormGroup;
  size: 'large' | 'default' | 'small' = 'large'
  isVisitUploadPackage = false
  iterateId!: number
  pageInfo: GrapqlType.CaseParamsType = {
    page: 1,
    pageSize: 10,
    keyword: '',
    categoryId: 0
  }
  // 修改参数
  editData!: GrapqlType.CaseType
  isVisitEditForm = false

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
    private caseService: CasesService,
    private msgService: NzMessageService,
    private iconService: NzIconService
  ) {
    this.iconService.fetchFromIconfont({
      scriptUrl: environment.iconFontJsUrl
    })
  }

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

  onUpdate(editData: GrapqlType.CaseType): void
  {
    this.editData = editData
    this.isVisitEditForm = true
  }

  onCancelUpdate(): void
  {
    this.isVisitEditForm = false
  }

  onFinished(updatedData: GrapqlType.CaseType): void
  {
    this.pageData.items = this.pageData.items.map(i => {
      if (Number(i.id) === updatedData.id) {
          this.caseService.getCase(this.pageInfo)
          return i
      } else {
        return i
      }
    })
    this.isVisitEditForm = false
  }

  onDelete(id: number): void
  {
    this.caseService.deleteCase(Number(id), this.pageInfo).subscribe(res => {
      this.msgService.success('删除成功')
    })
  }

  onUploadPackage(packageInfo: ApiType.UploadApkResType): void
  {
    this.isVisitUploadPackage = false
    this.caseService.iteratePackage({id: this.iterateId, packageId: packageInfo.id}, this.pageInfo).subscribe(() => {
      this.msgService.success('上传成功')
    })
  }

  /**
   * 拉起新包上传
   */
  onIterate(id: number): void
  {
    this.iterateId = id
    this.isVisitUploadPackage = true
  }

  cutText(text: string): string
  {
    const len = 20
    return text.substr(0, len) + (text.length > 20 ? '...' : '')
  }
}
