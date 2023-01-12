import { Injectable } from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {Company_API_All} from "../company-view/company-view.component";
import {CompanyAPIService} from "./company-api.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyDataSource implements DataSource<Company_API_All>{
  private companiesSubject = new BehaviorSubject<Company_API_All[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  constructor(private companyAPIService: CompanyAPIService) { }

  connect(collectionViewer: CollectionViewer): Observable<Company_API_All[]> {
    return this.companiesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.companiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadCompanies(filterName: string,pageSize: number=10, pageIndex: number=0, country: string = 'austria') {

    this.loadingSubject.next(true);

    this.companyAPIService.findCompanies(filterName, pageSize, pageIndex, country).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(Company_API_All => this.companiesSubject.next(Company_API_All));
  }
}
