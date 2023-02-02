import {Component} from '@angular/core';
import {VacantPosition, VacantPositionCreate, VacantPositionService} from "../services/vacant-position.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company_DB, CompanyDbService} from "../services/company.service";
import {DegreeProgramService} from "../services/degree-program-service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {CompanyAPIService} from "../services/company-api.service";
import {Company_API_All} from "../company-view/company-view.component";
import {CompanyDataSource} from "../services/company-data-source.service";
import {EmailService} from "../services/email-service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-vacancies-form',
  templateUrl: './vacancies-form.component.html',
  styleUrls: ['./vacancies-form.component.scss']
})
export class VacanciesFormComponent {
  vacantPositionFormGroup: FormGroup;
  pk: number | null = null;
  vacantPosition: VacantPositionCreate | null = null;
  companyOptions: Company_API_All[] = []
  username: string | null = null;
  degree_program_pk: number[] = [];
  approval_status: string = "?";
  isLecturer: boolean = false;
  mailRecipients: string[] = [];

  public companySearchFromControl: FormControl = new FormControl();

  constructor(private vacantPositionService: VacantPositionService,
              private companyDbService: CompanyDbService,
              private degreeProgramService: DegreeProgramService,
              private router: Router,
              private userService: UserService,
              private companyApiService: CompanyAPIService,
              private companyDataSourceService: CompanyDataSource,
              private emailService: EmailService,
              private snackBar: MatSnackBar) {
    this.vacantPositionFormGroup = new FormGroup({
      pk: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      description: new FormControl([]),
      company: new FormControl('')
    })
  }

  ngOnInit() {
    this.companyApiService.findCompanies('', 10, 1, 'austria').subscribe(companies => {
      this.companyOptions = companies
    })
    this.username = sessionStorage.getItem("username")
    if (this.userService.isLecturer()) {
      this.approval_status = 'y'
    }

    this.mailRecipients = this.emailService.getMailReceivers()

    this.vacantPositionFormGroup.get("company")?.valueChanges.subscribe(company => {
      this.companyDbService.getCompanyDBByOrbNum(company.orb_num.toString()).subscribe(companyDB => {
        if (companyDB.length == 0) {
          let companyToCreate: Company_DB = {
            pk: 0,
            name: company.name,
            orb_num: company.orb_num.toString(),
            custom_companies: null,
            approval_status: 'tbd'
          }
          this.companyDbService.createCompany(companyToCreate).subscribe()
        }
      })
    })

    this.companySearchFromControl.valueChanges.subscribe(value => {
      this.filterCompanyOptions(value)
    })
  }

  createOrUpdateVacantPosition() {
    let selected_company: Company_API_All = this.vacantPositionFormGroup.get("company")?.value
    this.companyDbService.getCompanyDBByOrbNum(selected_company.orb_num.toString()).subscribe(company => {
      let vacant_position: VacantPositionCreate = {
        pk: 0,
        title: this.vacantPositionFormGroup.get("title")?.value,
        description: this.vacantPositionFormGroup.get("description")?.value,
        currently_open: true,
        approval_status: this.approval_status,
        company: company[0].pk!!,
        degree_program: this.degree_program_pk
      }
      this.vacantPosition = vacant_position

      if (this.isLecturer) {
        this.emailService.sendEmail(this.emailService.mailBuilder(
          "New Vacancy Added",
          "Hi " + this.username + "!\n\n The vacancy \"" + this.vacantPosition!!.title + "\" was just added to the database!\n\n" +
          "Apply quickly before its too late!\n\n" +
          "Best regards, your JAM-Team",
          this.mailRecipients
        )).subscribe()
      } else {
        this.emailService.sendEmail(this.emailService.mailBuilder(
          "New vacancy waiting for approval",
          "Hi!\n\nThe vacancy \"" + this.vacantPosition!!.title + "\" was just added to the database!\n\n" +
          "Please accept or reject the request for students to see it!" +
          "\n\nKind Greetings, your JAM-Team",
          this.mailRecipients
        )).subscribe()
      }
      this.vacantPositionService.createVacancy(vacant_position).subscribe(response => {
        this.router.navigate(['vacancies-list'])
        this.snackBar.open("Successfully created vacancy, a lecturer will review it shows up here!")
      })
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
