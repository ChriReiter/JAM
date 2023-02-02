import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment"

export interface Company_DB {
  pk: number | null;
  name: string;
  orb_num: string | null;
  custom_companies: string | null;
  approval_status: string;
}


@Injectable({
  providedIn: 'root'
})
export class CompanyDbService {
  constructor(private http: HttpClient) {
  }

  getCompaniesDB() {
    return this.http.get<Company_DB[]>(`${environment.apiBaseUrl}/companies/`);
  }

  getCompaniesByDP(degree_program: string) {
    return this.http.get<Company_DB[]>(`${environment.apiBaseUrl}/companies/?dp=` + degree_program);
  }

  getCompanyByName(name: string) {
    return this.http.get<Company_DB>(`${environment.apiBaseUrl}/companies/?name=` + name);
  }

  getCompanyPK(company: Company_DB) {
    console.log(company.pk)
  }

  getCompanyDB(pk: number | null) {
    return this.http.get<Company_DB>(`${environment.apiBaseUrl}/companies/` + pk);
  }

  getCompanyDBByOrbNum(orb_num: string | null) {
    return this.http.get<Company_DB[]>(`${environment.apiBaseUrl}/companies/?orb-num=` + orb_num);
  }

  createCompany(company: Company_DB) {
    return this.http.post(`${environment.apiBaseUrl}/companies/`, company)
  }

  updateCompany(pk: number, company: Company_DB) {
    return this.http.put<Company_DB>(`${environment.apiBaseUrl}/companies/` + pk, company)
  }

}
