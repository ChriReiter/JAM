import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompanyListComponent} from "./company-list/company-list.component";
import {CompanyFormComponent} from "./company-form/company-form.component";
import {DegreeProgramListComponent} from "./degree-program-list/degree-program-list.component";
import {InternshipListComponent} from "./internship-list/internship-list.component";
import {LoginComponent} from "./login/login.component";
import {CompanyViewComponent} from "./company-view/company-view.component";
import {VacanciesFormComponent} from "./vacancies-form/vacancies-form.component";
import {VacanciesListComponent} from "./vacancies-list/vacancies-list.component";
import {InternshipFormComponent} from "./internship-form/internship-form.component";
import {VacanciesViewComponent} from "./vacancies-view/vacancies-view.component";

const routes: Routes = [
  {path: '', redirectTo: '/company-list', pathMatch: 'full'},
  {path: 'company-form', component: CompanyFormComponent},
  {path: 'company-form/:company-pk', component: CompanyFormComponent},
  {path: 'company-list', component: CompanyListComponent},
  {path: 'company-list/:degree-program', component: CompanyListComponent},
  {path: 'company-view/:orb_num', component: CompanyViewComponent},
  {path: 'degree-program-list', component: DegreeProgramListComponent},
  {path: 'internship-form', component: InternshipFormComponent},
  {path: 'internship-form/:internship', component: InternshipFormComponent},
  {path: 'internship-list', component: InternshipListComponent},
  {path: 'internship-list/:degree-program', component: InternshipListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'vacancies-list', component: VacanciesListComponent},
  {path: 'vacancies-form', component: VacanciesFormComponent},
  {path: 'vacancies-form/:vacant-position-pk', component: VacanciesFormComponent},
  {path: 'vacancies-view/:vacant-position-pk', component: VacanciesViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
