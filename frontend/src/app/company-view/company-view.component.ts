import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {ActivatedRoute, RouterModule} from "@angular/router";
import { API_Request} from "../company-list/company-list.component";
import {CompanyAPIService} from "../services/company-api.service";
import {Company_DB, CompanyDbService} from "../services/company.service";
export interface Address {
  address1: string;
  address2: string;
  country: string;
  state: string;
  zip: string;
  city: string;
}
export interface Company_API_All {
  orb_num: number;
  name: string;
  description: string;
  entity_type: string;
  address: Address;
  parent_comp: string;
  ultimate_parent_comp: string;
  website: string;
  industry: string;
  employees: number;
  revenue: string;
  year_founded: number;
  linkedin_account: SocialAccount;
  facebook_account: SocialAccount;
  twitter_account: SocialAccount;
  technologies: Technology[];
  favicon: string;
  phone: string;
  email: string;
  latitude: string;
  longitude: string;
}
export interface SocialAccount {
  url: string
}
export interface Technology {
  name: string;
}

export interface Ranking {
  position: number;
  ranking: string;
}

@Component({
  selector: 'app-company-view',
  templateUrl: './company-view.component.html',
  styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {

  orb_num: string = ""
  url: string = ""
  displayedColumns: string[] = ['name', 'link']
  address: Address = {
    address1: "unknown",
    address2: "unknown",
    country: "unknown",
    zip: "unknown",
    state: "unknown",
    city: "unknown"
  }

  linkedinAccount: SocialAccount = {
    url: ""
  }

  facebookAccount: SocialAccount = {
    url: ""
  }

  twitterAccount: SocialAccount = {
    url: ""
  }

  company: Company_API_All = {
    orb_num: 0,
    name: "unknown",
    description: "-",
    entity_type: "unknown",
    address: this.address,
    parent_comp: "",
    ultimate_parent_comp: "",
    website: "",
    industry: "",
    employees: 0,
    revenue: "",
    year_founded: 0,
    linkedin_account: this.linkedinAccount,
    facebook_account: this.facebookAccount,
    twitter_account: this.twitterAccount,
    technologies: [],
    favicon: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: ""
  }

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: RouterModule,
              public companyAPIService: CompanyAPIService,
              private companyDbService: CompanyDbService) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('orb_num');
    if(id){
      this.companyAPIService.getCompanyDetails(id).subscribe((details:Company_API_All) => this.company = details);
      let companyDB: Company_DB = {
        name: this.company.name,
        orb_num: this.company.orb_num.toString(),
        custom_companies: null,
        approval_status: '?',
        pk: null
      }
      this.companyDbService.createCompany(companyDB)
    }

  }
}
