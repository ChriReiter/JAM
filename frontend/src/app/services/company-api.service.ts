import { Injectable } from '@angular/core';
import {Company_API_All} from "../company-view/company-view.component";
import {HttpClient, HttpParams} from "@angular/common/http";
import {concat, concatMap, forkJoin, map, merge, mergeAll, Observable, of, tap} from "rxjs";
interface API_Request {
  request_fields: undefined;
  results: Company_API_All[];
  results_count: number;
}

@Injectable({
  providedIn: 'root'
})

export class CompanyAPIService {

  constructor(private http: HttpClient) { }

  findCompanies(filterName: string, pageSize: number, pageIndex: number, country: string):  Observable<Company_API_All[]>{
    const test: Observable<any>[] = [];
    while(pageSize > 0){
      let result = this.http.get('https://api.orb-intelligence.com/3/search/', {
        params: new HttpParams()
          .set('api_key', 'c66c5dad-395c-4ec6-afdf-7b78eb94166a')
          .set('limit', (pageSize < 10 ? pageSize : 10).toString())
          .set('name', filterName)
          .set('offset', pageIndex.toString())
          .set('is_standalone_company', '1')
          .set('country', country)
      }).pipe(
        map((res: any) =>  res["results"])
      );
      test.push(result);


      pageSize -= 10;
      pageIndex+=10;
    }

    const mergedObservable = test.reduce((acc, curr) => acc.pipe(
      concatMap(val1 => curr.pipe(
        map(val2 => [...val1, ...val2])
      ))
    ), of([]));
    // const mergedObservable = test.pipe(
    //   concatMap(val1 => test2.pipe(
    //     map(val2 => [...val1, ...val2])
    //   ))
    // );
    //const mergedObservable = concat(test, test2).pipe(map(values => [].concat(...values)));
    mergedObservable.pipe(mergeAll()).subscribe(val => console.log(val));
  return mergedObservable;
    // this.http.get<API_Request>('https://api.orb-intelligence.com/3/search/?api_key=c66c5dad-395c-4ec6-afdf-7b78eb94166a&limit=' + filterLimit + '&name=' + filterName + "&offset=" + offset).subscribe(request => {
    //   // return request.results
    // })
  }
}
