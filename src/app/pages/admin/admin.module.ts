import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './layout/main/main.component';
import { CollapIconComponent } from './icons/collap-icon/collap-icon.component';
import { MenuUnfoldIconComponent } from './icons/menu-unfold-icon/menu-unfold-icon.component';
import { BreadcrumbComponent } from './layout/main/breadcrumb/breadcrumb.component';
import { AddComponent } from './pages/login/addButton/add.component';
import { FormComponent } from './pages/login/addButton/form/form.component';
import { UploadComponent } from './pages/login/addButton/form/upload/upload.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    MainComponent,
    CollapIconComponent,
    MenuUnfoldIconComponent,
    BreadcrumbComponent,
    AddComponent,
    FormComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
