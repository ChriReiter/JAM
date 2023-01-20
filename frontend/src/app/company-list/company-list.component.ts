import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  //onRowClicked({row}: { row: any }) {
  onRowClicked(row: any) {
    this.router.navigate([`company-view/${row.orb_num}`])
    console.log('Row clicked: ', row);
  }


  constructor(private http: HttpClient,
              public route: ActivatedRoute,
              private router: Router,
              ) {
  }
  ngOnInit() {

  }
}

