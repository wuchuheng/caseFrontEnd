import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import UploadFileResType = GrapqlType.UploadFileResType;
import {CategoryService} from '../../../../../../services/graphql/category/category.service';
import Observable from 'zen-observable';

type ImgInfoType = {id: number; url: string}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  options: GrapqlType.CategoriesType = []
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  packageInfo: UploadFileResType = {
    id: 1,
    size: 96806859,
    version: '1.0.0',
    label: 'IMDemo',
    iconUrl: 'http://127.0.0.1:3000/icons/2021-05-09/1620566448244.png',
    iconFileId: 2,
  }

  banner: ImgInfoType = {id: 0, url: ''}

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
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
    private categoriesService: CategoryService
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
      bannerFileIds: [null, Validators.required]
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
}
