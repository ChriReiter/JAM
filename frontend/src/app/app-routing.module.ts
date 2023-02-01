import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {StudentDashboardComponent} from './student-dashboard/student-dashboard.component';
import {LecturerDashboardComponent} from "./lecturer-dashboard/lecturer-dashboard.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/company-list', pathMatch: 'full'},
  {path: 'company-form', component: CompanyFormComponent},
  {path: 'company-form/:company-pk', component: CompanyFormComponent},
  {path: 'company-list', component: CompanyListComponent},
  {path: 'company-list/:degree-program', component: CompanyListComponent, canActivate:[AuthGuard]},
  {path: 'company-view/:orb_num', component: CompanyViewComponent},
  {path: 'degree-program-list', component: DegreeProgramListComponent, canActivate:[AuthGuard]},
  {path: 'internship-form', component: InternshipFormComponent, canActivate:[AuthGuard]},
  {path: 'internship-form/:internship', component: InternshipFormComponent, canActivate:[AuthGuard]},
  {path: 'internship-list', component: InternshipListComponent, canActivate:[AuthGuard]},
  {path: 'internship-list/:degree-program', component: InternshipListComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'vacancies-list', component: VacanciesListComponent, canActivate:[AuthGuard]},
  {path: 'vacancies-form', component: VacanciesFormComponent, canActivate:[AuthGuard]},
  {path: 'vacancies-form/:vacant-position-pk', component: VacanciesFormComponent, canActivate:[AuthGuard]},
  {path: 'vacancies-view/:vacant-position-pk', component: VacanciesViewComponent, canActivate:[AuthGuard]},
  {path: 'vacant-positions/:vacant-position-pk', component: VacanciesViewComponent, canActivate:[AuthGuard]},
  {path: 'student-dashboard', component: StudentDashboardComponent, canActivate:[AuthGuard]},
  {path: 'lecturer-dashboard', component: LecturerDashboardComponent, canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
