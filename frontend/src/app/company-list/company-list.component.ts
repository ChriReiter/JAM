import { Component } from '@angular/core';
import {Company_DB, CompanyDbService} from "../services/company.service";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
//import {MatSnackBar} from "@angular/material/snack-bar";
import {DegreeProgram} from "../services/degree-program-service";
import {MatSnackBar} from "@angular/material/snack-bar";


export interface Company_API {
  name: string
  description: string;
  entity_type: string;
  address: Address;
  companyDB: Company_DB;
}

export interface Company_API_Result {
  orb_num: number;
  name: string;
  description: string;
  entity_type: string;
  country: string;
}

export interface Address {
  address1: string;
  address2: string;
  country: string;
  state: string;
  zip: string;
  city: string;
}
////TODO: API Interfaces redundancy check
export interface API_Request {
  request_fields: undefined;
  results: Company_API_Result[];
  results_count: number;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  companies_db: Company_DB[] = []
  companies: Company_API[] = []

  companies_links: Company_DB[] = []

  displayedColumns = ['name', 'description', 'entity_type', 'country', 'view_button', 'request_approval']
  url: string = ""
  filtered_companies: Company_API_Result[] = []

  currentName: string = ''
  currentLimit: number = 10

  filterFormControlName = new FormControl('')
  filterFormControlLimit = new FormControl(10)

  degree_program: string | null = null
  degree_programs: DegreeProgram[] = []
  dpFormGroup: FormGroup;

  constructor(private http: HttpClient,
              public route: ActivatedRoute,
              private snackbar: MatSnackBar,
              private companyDbService: CompanyDbService) {
    this.dpFormGroup = new FormGroup({
      degree_programs: new FormControl()
    })
  }
  ngOnInit(): void {
    this.degree_program = this.route.snapshot.paramMap.get('degree-program');
    if (this.degree_program !== null) {
      this.loadByDP(this.degree_program)
    } else {
      this.loadAll()
    }
    this.http.get<DegreeProgram[]>('http://localhost:8000/api/degree-programmes/').subscribe(degree_programs => {
      this.degree_programs = degree_programs
    })
    this.http.get<Company_DB>('http://localhost:8000/api/companies/1').subscribe( company => {
      this.companyDbService.getCompanyPK(company)
    })


  }

  filterByNameAndLimit(filterName: string | null, filterLimit: number) {
    let offset = 0
    if (filterName === "") {
      filterName = "''&entity_type=company"
      offset = Math.random() * 100
      offset = Math.round(offset)
    }
    this.http.get<API_Request>('https://api.orb-intelligence.com/3/search/?api_key=c66c5dad-395c-4ec6-afdf-7b78eb94166a&limit=' +
      + filterLimit + '&name=' + filterName + "&offset=" + offset).subscribe(request => {
      this.filtered_companies = request.results
    })
  }

  loadAll() {
    this.http.get<Company_DB[]>('http://localhost:8000/api/companies/').subscribe(companies => {
      this.companies_db = companies
      this.companies_links = this.companies_db.filter(company => company.data_in_api === 'y')
      this.iterateLinks(this.companies_links)
    })
    this.filterByNameAndLimit("''&entity_type=company", 10)
    this.filterFormControlName.valueChanges.subscribe(value => {
      if (value != null) {
        this.currentName = value
      } else {
        this.currentName = ''
      }
      this.filterByNameAndLimit(this.currentName, this.currentLimit)
    })
    this.filterFormControlLimit.valueChanges.subscribe(value => {
      if (value != null && value <= 10) {
        this.currentLimit = value
      } else {
        this.currentLimit = 0
      }
      this.filterByNameAndLimit(this.currentName, this.currentLimit)
    })
  }

  loadByDP(degree_program: string | null) {
    if (degree_program != null) {
      this.companyDbService.getCompaniesByDP(degree_program).subscribe(companies => {
        this.companies_db = companies
        this.companies_links = companies.filter(company => !this.companies_links.includes(company))
      })
    }
  }

  iterateLinks(companies_links: Company_DB[]) {
    this.companies = []
    for(let i in companies_links) {
      this.url = "https://api.orb-intelligence.com/3/fetch/"
      this.url += companies_links[i].orb_num
      this.url += "/?api_key=c66c5dad-395c-4ec6-afdf-7b78eb94166a"
      this.http.get<Company_API>(this.url).subscribe(company => {
        let company1: Company_API = {
          name: company.name,
          description: company.description,
          entity_type: company.entity_type,
          address: company.address,
          companyDB: companies_links[i]
        }
        this.companies.push(company1);
      })
    }
  }

  approve(pk: number) {
    this.companyDbService.getCompanyDB(pk).subscribe( company => {
      let company_to_approve = company
      company_to_approve.approval_status = "y"
      this.companyDbService.updateCompany(pk, company_to_approve).subscribe(() => {
        this.snackbar.open('approved company')
        this.ngOnInit()
      })
    })


  }

  reject(pk: number) {
    this.companyDbService.getCompanyDB(pk).subscribe( company => {
      let company_to_reject = company
      company_to_reject.approval_status = "n"
      this.companyDbService.updateCompany(pk, company_to_reject).subscribe( () => {
        this.snackbar.open('rejected company')
        this.ngOnInit()
      })
    })
  }

  request_approval(company: Company_API_Result) {
    let company_to_create: Company_DB = {
      pk: 0,
      name: company.name,
      data_in_api: "y",
      orb_num: company.orb_num.toString(),
      approval_status: "?"
    }
    this.companyDbService.createCompany(company_to_create)
  }
}
