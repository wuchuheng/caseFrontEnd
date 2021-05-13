import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../services/graphql/category/category.service';
import {AbstractControl, Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  listOfData: GrapqlType.CategoriesType = []
  isVisible = false
  isVisibleCreateForm = false
  validateForm!: FormGroup
  createForm!: FormGroup

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private msgService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.categoryService.categorySubject.subscribe(res => this.listOfData = res.categories )
    this.categoryService.getCategories()
    this.validateForm = this.fb.group({
      id: [null, [Validators.required] ],
      name: ['', [Validators.required] ]
    })
    this.createForm = this.fb.group({
      name: ['', [Validators.required]]
    })
  }

  onEdit(item: GrapqlType.CategoryType): void
  {
    this.isVisible = true
    this.validateForm.setValue({id: item.id, name: item.name})
  }

  handleCancel(): void
  {
    this.isVisible = false
  }

  get name(): AbstractControl
  {
      return this.validateForm.get('name') as AbstractControl
  }

  handleOk(): void
  {
    if (!this.name.errors?.require) {
      const name = this.validateForm.value.name
      const id = Number(this.validateForm.value.id)
      this.categoryService.update({id, name}).subscribe(() => {
        this.msgService.success('修改成功')
        this.isVisible = false
      })
    } else {
      // tslint:disable-next-line:forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  onCreate(): void
  {
    this.isVisibleCreateForm = true
  }

  onCancelCreateForm(): void
  {
    this.isVisibleCreateForm = false
  }
  onOkCreateForm(): void
  {
    const name = this.createForm.get('name') as AbstractControl
    if (!name.errors?.required) {
      this.isVisibleCreateForm = false
      this.categoryService.create(this.createForm.value.name).subscribe(() => {
        this.createForm.reset()
        this.msgService.success('添加成功')
      })
    } else {
      // tslint:disable-next-line:forin
      for (const i in this.createForm.controls) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
