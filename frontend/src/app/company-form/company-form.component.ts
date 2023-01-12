import {Component, Injectable} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Company_DB, CompanyDbService} from "../services/company.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})

export class CompanyFormComponent {
  companyFormGroup: FormGroup;

  constructor(private route: ActivatedRoute,
              private companyDbService: CompanyDbService) {
    this.companyFormGroup = new FormGroup({
      name: new FormControl('')
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


