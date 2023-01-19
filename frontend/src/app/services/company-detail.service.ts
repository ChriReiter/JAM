import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Company_API_All} from "../company-view/company-view.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyDetailService {

  constructor(private http: HttpClient) { }


  getCustomCompaniesByFilter(name:string){
    return this.http.get<Company_API_All[]>(`${environment.apiBaseUrl}/companydetails/search/${name}`)
  }
}
