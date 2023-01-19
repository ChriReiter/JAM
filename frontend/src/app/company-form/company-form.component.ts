import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Company_DB, CompanyDbService} from "../services/company.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})

export class CompanyFormComponent implements OnInit{
  companyFormGroup: FormGroup;
  ngOnInit(): void {
    
  }
  constructor(private route: ActivatedRoute,
              private companyDbService: CompanyDbService) {
    this.companyFormGroup = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      zip: new FormControl(''),
      address1: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      website: new FormControl(''),
      linkedin_account: new FormControl(''),
      facebook_account: new FormControl(''),
      twitter_account: new FormControl(''),
      employees: new FormControl(''),
      revenue: new FormControl(''),
      year_founded: new FormControl(''),
    })
  }

  createOrUpdateCompany() {
    let company: Company_DB = {
      pk: 0,
      name: this.companyFormGroup.get('name')?.value,
      approval_status: "?",
      data_in_api: "n",
      orb_num: ""
    }
    this.companyDbService.createCompany(company)
  }


}


