import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Company_API_All} from "../company-view/company-view.component";
import {CompanyDataSource} from "../services/company-data-source.service";
import {CompanyAPIService} from "../services/company-api.service";
import {PageEvent} from "@angular/material/paginator";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {UserService} from "../services/user.service";

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

  @Input()
  defaultSize=10;

  onRowClicked(row: any) {
    this.router.navigate([`company-view/${row.orb_num}`])
    console.log('Row clicked: ', row);
  }

  dataSource: CompanyDataSource;
  displayedColumns = ['name', 'country', 'city']
  length = 100;
  pageSize = this.defaultSize;
  pageIndex = 0;
  pageEvent: PageEvent;
  filterByName = '';
  filterFormControlName = new FormControl('')

  constructor(private http: HttpClient,
              public route: ActivatedRoute,
              private router: Router,
              private snackbar: MatSnackBar,
              private companyAPI: CompanyAPIService,
              public userService: UserService
  ) {
    this.dataSource = new CompanyDataSource(this.companyAPI);
    this.pageEvent = new PageEvent();
  }

  ngOnInit() {
    this.pageSize = this.defaultSize
    this.dataSource = new CompanyDataSource(this.companyAPI);
    this.dataSource.loadCompanies(this.filterByName, this.pageSize, this.pageIndex);
    this.filterFormControlName.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.filterByName = value;
      } else {
        this.filterByName = '';
      }
      this.dataSource.loadCompanies(this.filterByName, this.pageSize, this.pageIndex * this.pageSize);
    })

  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.dataSource.loadCompanies(this.filterByName, this.pageSize, this.pageIndex * this.pageSize);
  }
}

