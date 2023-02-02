import {Component} from '@angular/core';
import {Company_DB, CompanyDbService} from "../services/company.service";
import {Internship, Internship2, InternshipService} from "../services/internship.service";
import {Student, UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CompanyAPIService} from "../services/company-api.service";
import {Company_API_All} from "../company-view/company-view.component";
import {EmailService} from "../services/email-service";

@Component({
  selector: 'app-internship-form',
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.scss']
})

export class InternshipFormComponent {
  internshipFormGroup: FormGroup;

  internship: Internship2 | null = null;
  approval_status: string = "?"
  student_pk: number = 0;
  companyOptions: Company_API_All[] = []
  currentCompany: Company_DB | null = null;

  param: string | null = null

  mailRecipients: string[] = []

  public companySearchFromControl: FormControl = new FormControl();

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private internshipService: InternshipService,
              private companyApiService: CompanyAPIService,
              private companyDbService: CompanyDbService,
              private userService: UserService,
              private emailService: EmailService) {
    this.internshipFormGroup = new FormGroup({
      pk: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      description: new FormControl([], [Validators.required]),
      company: new FormControl('', [Validators.required]),
      application_status: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.param = this.route.snapshot.paramMap.get('internship');
    if (this.param != null) {
      this.internshipService.getInternship2(this.param).subscribe(int => {
        this.internship = int
        this.internshipFormGroup.setValue({
          pk: this.param,
          title: this.internship.title,
          description: this.internship.description,
          company: this.internship.company!,
          application_status: 1
        })
      })
    }
    this.student_pk = this.userService.getUserPk()
    this.companyApiService.findCompanies('', 10, 1, 'austria').subscribe(companies => {
      this.companyOptions = companies
    })
    this.companySearchFromControl.valueChanges.subscribe(value => {
      this.filterCompanyOptions(value)
    })
    this.internshipFormGroup.get("company")?.valueChanges.subscribe(company => {
      this.companyDbService.getCompanyDBByOrbNum(company.orb_num.toString()).subscribe(companyDB => {
        if (companyDB.length == 0) {
          let companyToCreate: Company_DB = {
            pk: 0,
            name: company.name,
            orb_num: company.orb_num.toString(),
            custom_companies: null,
            approval_status: 'tbd'
          }
          this.companyDbService.createCompany(companyToCreate).subscribe( comp => {
            // @ts-ignore
            this.currentCompany = comp
          })
        } else {
          this.currentCompany = companyDB[0]
        }
      })
    })
    this.mailRecipients = this.emailService.getMailReceivers()
  }
  createInternship() {
    this.internship = {
      pk: 0,
      title: this.internshipFormGroup.get("title")?.value,
      description: this.internshipFormGroup.get("description")?.value,
      application_status: this.internshipService.mapFullToAbb(this.internshipFormGroup.get("application_status")?.value),
      approval_status: "?",
      company: this.currentCompany!.pk,
      user: this.student_pk
    }
    this.internshipService.createInternships(this.internship).subscribe( () => {
      this.emailService.sendEmail(this.emailService.mailBuilder(
        "New internship waiting for approval",
        "Hi!\n\nThe internship \"" + this.internship!!.title + "\" was just added to the database!\n\n" +
        "Please accept or reject the request!" +
        "\n\nKind Greetings, your JAM-Team",
        this.mailRecipients
      )).subscribe()
      this.router.navigate(['internship-list'])
    })
  }

  filterCompanyOptions(filterValue: string) {
    if (filterValue != "") {
      this.companyApiService.findCompanies(filterValue, 10, 1, "").subscribe(companies => {
        this.companyOptions = companies
      })
    }
  }
}

