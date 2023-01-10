import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import { CompanyFormComponent } from './company-form/company-form.component';
import { DegreeProgramListComponent } from './degree-program-list/degree-program-list.component';
import { InternshipListComponent } from './internship-list/internship-list.component';
import { InternshipFormComponent } from './internship-form/internship-form.component';
import { VacanciesListComponent } from './vacancies-list/vacancies-list.component';
import { VacanciesFormComponent } from './vacancies-form/vacancies-form.component';
import {JwtModule} from "@auth0/angular-jwt";
import { CompanyViewComponent } from './company-view/company-view.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    LoginComponent,
    CompanyFormComponent,
    DegreeProgramListComponent,
    InternshipListComponent,
    InternshipFormComponent,
    VacanciesListComponent,
    VacanciesFormComponent,
    CompanyViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxMatSelectSearchModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8000']
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
