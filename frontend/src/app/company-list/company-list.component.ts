import {Component, Inject, OnInit} from '@angular/core';
import {Company_DB, CompanyDbService} from "../services/company.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
//import {MatSnackBar} from "@angular/material/snack-bar";
import {DegreeProgram} from "../services/degree-program-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Company_API_All} from "../company-view/company-view.component";
import {CompanyDataSource} from "../services/company-data-source.service";
import {CompanyAPIService} from "../services/company-api.service";
import {PageEvent} from "@angular/material/paginator";
import {debounceTime, distinctUntilChanged} from "rxjs";
export interface Company_API_Result {
  orb_num: number;
  name: string;
  description: string;
  entity_type: string;
  country: string;
}
export interface API_Request {
  request_fields: undefined;
  results: Company_API_All[];
  results_count: number;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  //onRowClicked({row}: { row: any }) {
  onRowClicked(row: any) {
    this.router.navigate([`company-view`],{queryParams:{'orb_num':row.orb_num, 'custom_companies':row.id}})
    console.log('Row clicked: ', row);
  }
  dataSource: CompanyDataSource;
  displayedColumns = ['name', 'country','city']
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageEvent: PageEvent;
  filterByName = '';
  filterFormControlName = new FormControl('')

  constructor(private http: HttpClient,
              public route: ActivatedRoute,
              private router: Router,
              private snackbar: MatSnackBar,
              private companyAPI:CompanyAPIService
              ) {
    this.dataSource = new CompanyDataSource(this.companyAPI);
    this.pageEvent = new PageEvent();
  }
  ngOnInit() {
    this.dataSource = new CompanyDataSource(this.companyAPI);
    this.dataSource.loadCompanies(this.filterByName, this.pageSize,this.pageIndex);

    this.filterFormControlName.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      if(value){
        this.filterByName = value;
      }else{
        this.filterByName = '';
      }
      this.dataSource.loadCompanies(this.filterByName, this.pageSize,this.pageIndex * this.pageSize);
    })

  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.dataSource.loadCompanies(this.filterByName, this.pageSize,this.pageIndex * this.pageSize);
  }
}

