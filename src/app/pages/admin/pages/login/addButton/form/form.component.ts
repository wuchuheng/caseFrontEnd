import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import UploadFileResType = GrapqlType.UploadFileResType;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  validateForm!: FormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  packageInfo: UploadFileResType = {
    icon: 'http://127.0.0.1:3000/icons/2021-05-08/1620461661063.png',
    id: 45,
    label: 'IMDemo',
    size: 96806859,
    url: 'http://127.0.0.1:3000/apk/2021-05-08/1620461660782-7850ce6da28e1644b9a41e2ff5032f0c.apk',
    version: '1.0.0'
  }

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      id: [this.packageInfo.id],
      size: [this.packageInfo.size],
      icon: [this.packageInfo.icon, Validators.required],
      label: [this.packageInfo.label, Validators.required],
      version: [this.packageInfo.version],
    });
  }
  get id(): AbstractControl
  {
    return this.validateForm.get('id') as AbstractControl
  }

  onUploadIcon(e: string): void
  {
    this.validateForm.setValue({
      ...this.validateForm.value,
      icon: e
    })
  }
}
