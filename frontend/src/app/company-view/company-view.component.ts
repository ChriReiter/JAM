import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, RouterModule} from "@angular/router";


@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {


  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: RouterModule) {
  }
  ngOnInit(): void {

  }
}
