import { Component } from '@angular/core';
import {VacantPositionCreate, VacantPositionService} from "../services/vacant-position.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Company_DB, CompanyDbService} from "../services/company.service";
import {DegreeProgramService} from "../services/degree-program-service";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {CompanyAPIService} from "../services/company-api.service";
import {Company_API_All} from "../company-view/company-view.component";
import {CompanyDataSource} from "../services/company-data-source.service";

@Component({
  selector: 'app-vacancies-form',
  templateUrl: './vacancies-form.component.html',
  styleUrls: ['./vacancies-form.component.scss']
})
export class VacanciesFormComponent {
  vacantPositionFormGroup: FormGroup;
  pk: number | null = null;
  companyOptions: Company_API_All[] = []
  username: string | null = null;
  degree_program_pk: number[] = [];
  approval_status: string = "?";

  public companySearchFromControl: FormControl = new FormControl();

  constructor(private vacantPositionService: VacantPositionService,
              private companyDbService: CompanyDbService,
              private degreeProgramService: DegreeProgramService,
              private router: Router,
              private userService: UserService,
              private companyApiService: CompanyAPIService,
              private companyDataSourceService: CompanyDataSource) {
    this.vacantPositionFormGroup = new FormGroup({
      pk: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      description: new FormControl([]),
      company: new FormControl('')
    })
  }
  ngOnInit() {
    this.companyApiService.findCompanies('', 10, 1, 'austria').subscribe( companies => {
      this.companyOptions = companies
    })
    let username = sessionStorage.getItem("username")

    this.vacantPositionFormGroup.get("company")?.valueChanges.subscribe( company => {
      this.companyDbService.getCompanyDBByOrbNum(company.orb_num.toString()).subscribe(companyDB => {
        if (companyDB.length == 0) {
          let companyToCreate: Company_DB = {
            pk: 0,
            name: company.name,
            orb_num: company.orb_num.toString(),
            data_in_api: 'y',
            approval_status: 'tbd'
          }
          this.companyDbService.createCompany(companyToCreate).subscribe(() => {
            //console.log("created company ", companyToCreate)
          })
        }
      })
    })

    this.companySearchFromControl.valueChanges.subscribe( value => {
         this.filterCompanyOptions(value)
    })
  }

  createOrUpdateVacantPosition() {
    let selected_company: Company_API_All = this.vacantPositionFormGroup.get("company")?.value
    this.companyDbService.getCompanyDBByOrbNum(selected_company.orb_num.toString()).subscribe( company => {
      let vacant_position: VacantPositionCreate = {
        pk: 0,
        title: this.vacantPositionFormGroup.get("title")?.value,
        description: this.vacantPositionFormGroup.get("description")?.value,
        currently_open: true,
        approval_status: this.approval_status,
        company: company[0].pk,
        degree_program: this.degree_program_pk
      }

    this.vacantPositionService.createVacancy(vacant_position).subscribe( response => {
      this.router.navigate(['vacancies-list'])
    })
    })
    /*
    this.companyDbService.getCompanyDBByOrbNum(selected_company.orb_num.toString()).subscribe( company => {
      if (company.length == 0) {
        let companyToCreate: Company_DB = {
          pk: 0,
          name: selected_company.name,
          orb_num: selected_company.orb_num.toString(),
          data_in_api: 'y',
          approval_status: 'tbd'
        }
        this.companyDbService.createCompany(companyToCreate).subscribe( res => {
          console.log(res)
        })
      } else {
        let company_for_vacancy = company
        console.log(company)
        let vacant_position: VacantPositionCreate = {
          pk: 0,
          title: this.vacantPositionFormGroup.get("title")?.value,
          description: this.vacantPositionFormGroup.get("description")?.value,
          currently_open: true,
          approval_status: this.approval_status,
          company: company_for_vacancy[0].pk,
          degree_program: this.degree_program_pk
        }
      }


      //this.vacantPositionService.createVacancy(vacant_position).subscribe( response => {
      //  this.router.navigate(['vacancies-list'])
      //})
    })*/
  }

  filterCompanyOptions(filterValue: string) {
    if (filterValue != "") {
      this.companyApiService.findCompanies(filterValue, 10, 1, "").subscribe( companies => {
        this.companyOptions = companies
      })
    }

  }
}
