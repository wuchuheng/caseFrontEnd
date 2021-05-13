import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../../../services/graphql/category/category.service';
import {CasesService} from '../../../../../services/graphql/cases/cases.service';
import FileType = GrapqlType.FileType;
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input()editData!: GrapqlType.CaseType
  @Output()finished: EventEmitter<GrapqlType.CaseType> = new EventEmitter<GrapqlType.CaseType>()
  validateForm!: FormGroup;
  options: GrapqlType.CategoriesType = []
  bannerFileList: NzUploadFile[] = [ ]

  get coverFileId(): AbstractControl
  {
    return this.validateForm.get('coverFileId') as AbstractControl
  }
  get bannerFileIds(): AbstractControl
  {
    return this.validateForm.get('bannerFileIds') as AbstractControl
  }

  get detailFileId(): AbstractControl
  {
    return this.validateForm.get('detailFileId') as AbstractControl
  }

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoryService,
    private caseService: CasesService,
    private msgService: NzMessageService
  ) { }

  ngOnInit(): void
  {
    // 初始化表单数据
    this.validateForm = this.fb.group({
      id: [this.editData.id],
      size: [this.editData.size],
      iconFileId: [this.editData.icon.id, Validators.required],
      label: [this.editData.label, Validators.required],
      version: [this.editData.version],
      category: [this.editData.categoryId, Validators.required],
      coverFileId: [this.editData.cover.id, Validators.required],
      bannerFileIds: [this.editData.banner.map(i => i.id), Validators.required],
      desc: [this.editData.desc, Validators.required],
      remark: [this.editData.remark, Validators.required],
      detailFileId: [this.editData.detail.id, Validators.required]
    });
    this.categoriesService.categorySubject.subscribe(res => this.options = res.categories )
    this.categoriesService.getCategories()
    this.initBannerList()
  }

  initBannerList(): void
  {
    this.bannerFileList = this.editData.banner.map(i => {
      const res: NzUploadFile = {
        uid: `${i.id}`,
        name: '',
        url: i.url,
        status: 'done'
      }
      return res
    })
  }

  submitForm(): void
  {
    const updateParams: GrapqlType.UpdateCaseParamsType = {
      id: Number(this.editData.id),
      label: this.validateForm.value.label,
      iconFileId: this.validateForm.value.iconFileId,
      coverFileId: this.validateForm.value.coverFileId,
      bannerFileIds: this.validateForm.value.bannerFileIds,
      desc: this.validateForm.value.desc,
      remark: this.validateForm.value.remark
    }
    this.caseService.updateCase(updateParams).subscribe(res => {
      this.msgService.success('更新成功')
      this.finished.emit(res)
    })
  }

  onUploadIcon(file: FileType): void
  {
     this.validateForm.setValue({
       ...this.validateForm.value,
       iconFileId: file.id
     })
     this.editData.icon = file
  }

  onUploadCover(file: FileType): void
  {
    this.validateForm.setValue({
      ...this.validateForm.value,
      coverFileId: file.id
    })
    this.editData.cover = file
  }

  onBannerChange(newFiles: NzUploadFile[]): void
  {
    const bannerIds: number[] = []
    newFiles.filter(e => e.status === 'done').map(e => bannerIds.push(Number(e.uid)))
    this.bannerFileList = newFiles
    this.validateForm.setValue({
      ...this.validateForm.value,
      bannerFileIds: bannerIds
    })
  }

  onDetailFile(newDetailFile: FileType): void
  {
    this.validateForm.setValue({
      ...this.validateForm.value,
      detailFileId: newDetailFile.id
    })
    this.editData.detail = {
      id: newDetailFile.id,
      url: newDetailFile.url
    }
  }
}

