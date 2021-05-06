import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {HomeComponent} from './pages/home/home.component';
import {DetailComponent} from './pages/detail/detail.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'cases/:id', component: DetailComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
