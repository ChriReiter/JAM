import {Component} from '@angular/core';
import {Company_DB, CompanyDbService} from "../services/company.service";
import {Internship, Internship2, InternshipService} from "../services/internship.service";
import {Student, UserService} from "../services/user.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-internship-form',
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.scss']
})

export class InternshipFormComponent {
  internshipFormGroup: FormGroup;
  pk: string | null = null;
  companyOptions: Company_DB[] = [];
  companyOptionsDB: Company_DB[] = [];

  internship: Internship | null = null;
  approval_status: string = "?"
  current_company: Company_DB | null = null;
  current_company_array: Company_DB[] = []
  current_student: Student | null = null;
  current_internship: Internship | null = null;

  public companySearchFromControl: FormControl = new FormControl();


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private internshipService: InternshipService,
              private companyService: CompanyDbService,
              private userService: UserService) {
    this.internshipFormGroup = new FormGroup({
      pk: new FormControl(null),
      title: new FormControl('', [Validators.required]),
      description: new FormControl([]),
      company: new FormControl(''),
      application_status: new FormControl()
    })
  }

  ngOnInit(): void {
  //   this.pk = this.route.snapshot.paramMap.get('internship');
  //   let username = sessionStorage.getItem("username")
  //   if (this.pk) {
  //     this.internshipService.getInternship(this.pk)
  //       .subscribe(internship => {
  //         this.internship = internship
  //         this.internshipFormGroup.setValue({
  //           pk: internship.pk,
  //           title: internship.title,
  //           description: internship.description,
  //           application_status: this.internshipService.mapAbbToFull(internship.application_status),
  //           company: internship.company.name
  //         });
  //         this.approval_status = internship.approval_status
  //         this.current_company = internship.company
  //         this.current_internship = internship
  //       })
  //   }
  //   this.companyService.getCompaniesDB().subscribe(companies => {
  //     this.companyOptions = companies
  //     this.companyOptionsDB = this.companyOptions
  //   });
  //   if (username != null) {
  //     this.userService.getStudentByUsername(username).subscribe(student => this.current_student = student[0])
  //   }
  //   this.companySearchFromControl.valueChanges.subscribe(value => {
  //     this.filterCompanyOptions(value)
  //   })
  // }
  //
  // createOrUpdateInternship() {
  //   if (this.pk != null && this.current_student != null
  //     && this.current_company != null && this.current_internship != null) {
  //     //update existing internship
  //     let internship: Internship = this.createInternshipInterface(
  //       this.current_internship.pk,
  //       this.internshipFormGroup.get('title')?.value,
  //       this.internshipFormGroup.get('description')?.value,
  //       this.internshipService.mapFullToAbb(this.internshipFormGroup.get('application_status')?.value),
  //       this.approval_status,
  //       this.current_student,
  //       this.current_company)
  //     this.internshipService.updateInternships(internship).subscribe(response => {
  //       this.router.navigate(['internship-list'])
  //     })
  //   } else if (this.pk === null) {
  //     // create new internship
  //     let company_fg: Company_DB = this.internshipFormGroup.get('company')?.value
  //     if (company_fg != null && company_fg.pk !== 0) {
  //       this.companyService.getCompanyDB(company_fg.pk).subscribe(company => {
  //         this.current_company = company
  //         if (this.current_student != null && this.current_company != null) {
  //           let internship: Internship2 = this.createInternship2Interface(
  //             0,
  //             this.internshipFormGroup.get('title')?.value,
  //             this.internshipFormGroup.get('description')?.value,
  //             this.internshipService.mapFullToAbb(this.internshipFormGroup.get('application_status')?.value),
  //             this.approval_status,
  //             this.current_student.pk,
  //             this.current_company.pk
  //           )
  //           this.internshipService.createInternships(internship).subscribe(() => {
  //             this.router.navigate(['internship-list'])
  //           })
  //         }
  //       })
  //     } else if (company_fg != null && company_fg.pk === 0) {
  //       this.companyService.createCompany(company_fg).subscribe(new_comp => {
  //         this.companyService.getCompanyDBByOrbNum(company_fg.orb_num).subscribe(new_company => {
  //           this.current_company_array = new_company
  //           this.current_company = this.current_company_array[0]
  //           if (this.current_student != null && this.current_company != null) {
  //             let internship: Internship2 = this.createInternship2Interface(
  //               0,
  //               this.internshipFormGroup.get('title')?.value,
  //               this.internshipFormGroup.get('description')?.value,
  //               this.internshipService.mapFullToAbb(this.internshipFormGroup.get('application_status')?.value),
  //               this.approval_status,
  //               this.current_student.pk,
  //               this.current_company.pk
  //             )
  //             this.internshipService.createInternships(internship).subscribe(() => {
  //               this.router.navigate(['internship-list'])
  //             })
  //           }
  //         })
  //       })
  //     }
  //   }
  // }
  //
  // createInternshipInterface(pk: number, title: string, description: string, application_status: string,
  //                           approval_status: string, student: Student, company: Company_DB): Internship {
  //   let internship: Internship = {
  //     pk: pk,
  //     title: title,
  //     description: description,
  //     application_status: application_status,
  //     approval_status: approval_status,
  //     student: student,
  //     company: company
  //   }
  //   return internship
  // }
  //
  // createInternship2Interface(pk: number, title: string, description: string, application_status: string,
  //                            approval_status: string, student: number, company: number): Internship2 {
  //   let internship: Internship2 = {
  //     pk: pk,
  //     title: title,
  //     description: description,
  //     application_status: application_status,
  //     approval_status: approval_status,
  //     student: student,
  //     company: company
  //   }
  //   return internship
  // }
  //
  // filterCompanyOptions(filterValue: string) {
  //   if (filterValue != "") {
  //     this.http.get<API_Request>('https://api.orb-intelligence.com/3/search/?api_key=c66c5dad-395c-4ec6-afdf-7b78eb94166a&limit=' +
  //       +"10" + '&name=' + filterValue).subscribe(request => {
  //       this.companyOptions = request.results.map(company => this.APIResultToCompanyDB(company))
  //       console.log(this.companyOptions)
  //     })
  //   }
  //
  // }
  //
  // APIResultToCompanyDB(company: Company_API_Result): Company_DB {
  //   if (this.companyOptionsDB.map(companyDB => companyDB.orb_num).filter(orb_num => orb_num === company.orb_num.toString()).length === 1) {
  //     return this.companyOptionsDB.filter(companyDB => companyDB.orb_num === company.orb_num.toString())[0]
  //   } else {
  //     let companyDb: Company_DB = {
  //       pk: 0,
  //       name: company.name,
  //       orb_num: company.orb_num.toString(),
  //       data_in_api: "y",
  //       approval_status: "?"
  //     }
  //     return companyDb
  //   }


  }
}
