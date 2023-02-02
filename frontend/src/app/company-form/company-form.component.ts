import {Component, Injectable, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Company_DB, CompanyDbService} from "../services/company.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailService} from "../services/email-service";

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})

export class CompanyFormComponent implements OnInit{
  companyFormGroup: FormGroup;
  mailRecipients: string[] = []

  constructor(private route: ActivatedRoute,
              private companyDbService: CompanyDbService,
              private emailService: EmailService) {
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
  ngOnInit(): void {
    this.mailRecipients = this.emailService.getMailReceivers()
  }

  createOrUpdateCompany() {
    let company: Company_DB = {
      pk: 0,
      name: this.companyFormGroup.get('name')?.value,
      approval_status: "?",
      custom_companies: null,
      orb_num: ""
    }
    this.companyDbService.createCompany(company).subscribe( () => {
      this.emailService.sendEmail(this.emailService.mailBuilder(
        "New company waiting for approval",
        "Hi!\n\nThe company \"" + company.name + "\" was just added to the database!\n\n" +
        "Please accept or reject the request for students to see it!" +
        "\n\nKind Greetings, your JAM-Team",
        this.mailRecipients
      )).subscribe()
    })
  }


}


