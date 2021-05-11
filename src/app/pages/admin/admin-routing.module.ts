import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {MainComponent} from './layout/main/main.component';
import {CanActiveateLoginGuard} from './guard/can-activeate-login.guard';

const routes: Routes = [
  {path: 'admin',
    component: MainComponent,
    children: [
      {path: '', component: HomeComponent, canActivate: [CanActiveateLoginGuard]},
      {path: 'home', component: HomeComponent, canActivate: [CanActiveateLoginGuard]}
    ]},
  {path: 'admin/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
