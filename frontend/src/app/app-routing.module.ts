import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompanyListComponent} from "./company-list/company-list.component";
import {CompanyFormComponent} from "./company-form/company-form.component";
import {LoginComponent} from "./login/login.component";
import {CompanyViewComponent} from "./company-view/company-view.component";

const routes: Routes = [
  {path: '', redirectTo: '/company-list', pathMatch: 'full'},
  {path: 'company-form', component: CompanyFormComponent},
  {path: 'company-form/:company-pk', component: CompanyFormComponent},
  {path: 'company-list', component: CompanyListComponent},
  {path: 'company-list/:degree-program', component: CompanyListComponent},
  {path: 'company-view/:orb_num', component: CompanyViewComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
