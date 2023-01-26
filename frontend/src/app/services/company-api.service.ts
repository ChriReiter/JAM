import { Injectable } from '@angular/core';
import {Company_API_All} from "../company-view/company-view.component";
import {HttpClient, HttpParams} from "@angular/common/http";
import {concat, concatMap, forkJoin, map, merge, mergeAll, Observable, of, tap} from "rxjs";
import {CustomCompanyService} from "./custom-company.service";
import {UserService} from "./user.service";
interface API_Request {
  request_fields: undefined;
  results: Company_API_All[];
  results_count: number;
}

@Injectable({
  providedIn: 'root'
})

export class CompanyAPIService {

  constructor(private http: HttpClient, private customCompanyService: CustomCompanyService, private userService: UserService) { }

  findCompanies(filterName: string, pageSize: number, pageIndex: number, country: string):  Observable<Company_API_All[]>{
    const observables: Observable<any>[] = [];
    let cnt = pageSize;
    if(pageIndex == 0 && this.userService.isLoggedIn$){
      observables.push(this.customCompanyService.getCustomCompaniesByFilter(filterName));
    }

    while(cnt > 0){
      let result = this.http.get('https://api.orb-intelligence.com/3/search/', {
        params: new HttpParams()
          .set('api_key', 'c66c5dad-395c-4ec6-afdf-7b78eb94166a')
          .set('limit', (cnt < 10 ? cnt : 10).toString())
          .set('name', filterName)
          .set('offset', pageIndex.toString())
          .set('is_standalone_company', '1')
          .set('country', country)
      }).pipe(
        map((res: any) =>  res["results"])
      );
      observables.push(result);
      cnt -= 10;
      pageIndex+=10;
    }

    const mergedObservable = observables.reduce((acc, curr) => acc.pipe(
      concatMap(val1 => curr.pipe(
        map(val2 => [...val1, ...val2])
      ))
    ), of([]));
  return mergedObservable;
  }

  getCompanyDetails(orb_num:string):Observable<Company_API_All>{

    let result = this.http.get(`https://api.orb-intelligence.com/3/fetch/${orb_num}`, {
      params: new HttpParams()
        .set('api_key', 'c66c5dad-395c-4ec6-afdf-7b78eb94166a')
    }).pipe(
      map((res: any) =>  res)
    );
    return result;
  }
}
