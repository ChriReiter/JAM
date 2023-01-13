import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppRoutingModule} from "../app-routing.module";
import {ActivatedRoute, RouterModule} from "@angular/router";
import { API_Request} from "../company-list/company-list.component";
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
  other_names: string[];
  website: string;
  industry: string;
  employees: number;
  revenue: string;
  year_founded: number;
  linkedin_account: SocialAccount;
  facebook_account: SocialAccount;
  twitter_account: SocialAccount;
  technologies: Technology[];
  ranking_positions: Ranking[];
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
export class CompanyViewComponent {

  orb_num: string | null = ""
  url: string = ""
  url_lookalikes: string = ""
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
    other_names: [],
    website: "",
    industry: "",
    employees: 0,
    revenue: "",
    year_founded: 0,
    linkedin_account: this.linkedinAccount,
    facebook_account: this.facebookAccount,
    twitter_account: this.twitterAccount,
    technologies: [],
    ranking_positions: [],
    favicon: "",
    phone: "",
    email: "",
    latitude: "",
    longitude: ""
  }

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: RouterModule) {

  }

  ngOnInit(): void {
    this.orb_num = this.route.snapshot.paramMap.get('orb_num');
    this.loadCompanies(this.orb_num)
  }

  paramRefresh(orb_num: string) {
    this.loadCompanies(orb_num)
  }

  loadCompanies(orb_num: string | null) {
    this.url = "https://api.orb-intelligence.com/3/fetch/"
    this.url += orb_num
    this.url += "/?api_key=c66c5dad-395c-4ec6-afdf-7b78eb94166a"

    this.http.get<Company_API_All>(this.url).subscribe(company => {
      this.company = {
        orb_num: company.orb_num,
        name: company.name,
        description: company.description,
        entity_type: company.entity_type,
        address: company.address,
        parent_comp: company.parent_comp,
        ultimate_parent_comp: company.ultimate_parent_comp,
        other_names: company.other_names,
        website: company.website,
        industry: company.industry,
        employees: company.employees,
        revenue: company.revenue,
        year_founded: company.year_founded,
        linkedin_account: company.linkedin_account,
        facebook_account: company.facebook_account,
        twitter_account: company.twitter_account,
        technologies: company.technologies,
        ranking_positions: company.ranking_positions,
        favicon: company.favicon,
        phone: company.phone,
        email: company.email,
        latitude: company.latitude,
        longitude: company.longitude
      }

    })
  }
}
