import { Component } from '@angular/core';
import {VacantPositionCreate, VacantPositionService} from "../services/vacant-position.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company_DB, CompanyDbService} from "../services/company.service";
import {DegreeProgramService} from "../services/degree-program-service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-vacancies-form',
  templateUrl: './vacancies-form.component.html',
  styleUrls: ['./vacancies-form.component.scss']
})
export class VacanciesFormComponent {
  vacantPositionFormGroup: FormGroup;
  pk: number | null = null;
  companyOptions: Company_DB[] = []
  username: string | null = null;
  degree_program_pk: number[] = [];
  approval_status: string = "?";

  constructor(private vacantPositionService: VacantPositionService,
              private companyDbService: CompanyDbService,
              private degreeProgramService: DegreeProgramService,
              private router: Router,
              private userService: UserService) {
    this.vacantPositionFormGroup = new FormGroup({
      pk: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      description: new FormControl([]),
      company: new FormControl('')
    })
  }

  ngOnInit() {
    this.companyDbService.getCompaniesDB().subscribe( companies => {
      this.companyOptions = companies
    })
    let username = sessionStorage.getItem("username")
    if (username != null) {
      this.degreeProgramService.getDegreeProgramByUsername(username).subscribe( degree_program => {
        this.degree_program_pk = degree_program.map(degree_program => degree_program.pk)
      })
    }
    if (this.userService.isLecturer(username)) {
      this.approval_status = "y"
    }

  }

  createOrUpdateVacantPosition() {
    this.companyDbService.getCompanyDB(this.vacantPositionFormGroup.get("company")?.value).subscribe( company => {
      let company_for_vacancy = company
      let vacant_position: VacantPositionCreate = {
        pk: 0,
        title: this.vacantPositionFormGroup.get("title")?.value,
        description: this.vacantPositionFormGroup.get("description")?.value,
        currently_open: true,
        approval_status: this.approval_status,
        company: company_for_vacancy.pk,
        degree_program: this.degree_program_pk
      }
      this.vacantPositionService.createVacancy(vacant_position).subscribe( response => {
        this.router.navigate(['vacancies-list'])
      })
    })
  }
}
