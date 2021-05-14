import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { ItemRenderComponent } from './pages/home/item-render/item-render.component';
import { DetailComponent } from './pages/detail/detail.component';
import {AdminModule} from './pages/admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    HeaderComponent,
    ItemRenderComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    AdminModule,
    BrowserAnimationsModule,
    FormsModule,
    NzImageModule,
    NzIconModule,
    NzModalModule,
    NzPopoverModule,
    NzDrawerModule
],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
