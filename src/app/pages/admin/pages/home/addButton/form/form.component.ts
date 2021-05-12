import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import {CategoryService} from '../../../../../../services/graphql/category/category.service';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {CasesService} from '../../../../../../services/graphql/cases/cases.service';
import {NzMessageService} from 'ng-zorro-antd/message';

type ImgInfoType = {id: number; url: string}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Output() created: EventEmitter<GrapqlType.CreateCaseResType> = new EventEmitter<GrapqlType.CreateCaseResType>()
  @Input() packageInfo!: ApiType.UploadApkResType
  options: GrapqlType.CategoriesType = []
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  banner: ImgInfoType = {id: 0, url: ''}
  detailFile: ImgInfoType = {id: 0, url: ''}

  bannerFileList: NzUploadFile[] = [ ]

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.invalid) {
      this.caseService.create(this.validateForm.value).subscribe(res => {
        this.msg.create('success', '创建成功')
        this.created.emit(res)
      })
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoryService,
    private caseService: CasesService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [this.packageInfo.id],
      size: [this.packageInfo.size],
      iconFileId: [this.packageInfo.iconFileId, Validators.required],
      label: [this.packageInfo.label, Validators.required],
      version: [this.packageInfo.version],
      category: [null, Validators.required],
      coverFileId: [null, Validators.required],
      bannerFileIds: [null, Validators.required],
      desc: ['', Validators.required],
      remark: ['', Validators.required],
      detailFileId: [null, Validators.required]
    });
    this.categoriesService.getCategories().subscribe(res =>  {
        this.options = res.categories
      }
    )
  }
  get id(): AbstractControl
  {
    return this.validateForm.get('id') as AbstractControl
  }

  onUploadIcon(e: ImgInfoType): void
  {
    this.validateForm.setValue({
      ...this.validateForm.value,
      iconFileId: e.id
    })
    this.packageInfo = {
      ...this.packageInfo,
      iconUrl: e.url
    }
  }

  onUploadCover(e: ImgInfoType): void
  {
    this.validateForm.setValue({
      ...this.validateForm.value,
      coverFileId: e.id
    })
    this.banner = {
      ...e
    }
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

  onDetailFile(newDetailFile: ImgInfoType): void
  {
    this.validateForm.setValue({
      ...this.validateForm.value,
      detailFileId: newDetailFile.id
    })
    this.detailFile = newDetailFile
  }

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
}
