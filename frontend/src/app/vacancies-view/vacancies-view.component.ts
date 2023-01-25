import { Component } from '@angular/core';
import {VacantPosition, VacantPositionService} from "../services/vacant-position.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Company_DB} from "../services/company.service";
import {Internship2, InternshipService} from "../services/internship.service";
import {Student, UserService} from "../services/user.service";

@Component({
  selector: 'app-vacancies-view',
  templateUrl: './vacancies-view.component.html',
  styleUrls: ['./vacancies-view.component.scss']
})
export class VacanciesViewComponent {
  company: Company_DB = {
    pk: 0,
    name: "",
    orb_num: "",
    custom_companies: null,
    approval_status: "n"

  }
  vacancy: VacantPosition = {
    pk: 0,
    title: "",
    description: "",
    currently_open: false,
    approval_status: "?",
    company: this.company,
    degree_program: []
  }
  vacancy_pk: string | null = null;
  username: string | null = null
  student: Student[] = []

  isLecturer: boolean = false

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private vacantPositionService: VacantPositionService,
              private internshipService: InternshipService, private userService: UserService) {

  }
  ngOnInit() {
    this.vacancy_pk = this.route.snapshot.paramMap.get('vacant-position-pk');
    if (this.vacancy_pk != null) {
      this.vacantPositionService.getVacancy(parseInt(this.vacancy_pk)).subscribe( vacancy => {
        this.vacancy = vacancy
      })
    }
    this.username = sessionStorage.getItem("username")
    if (this.username != null) {
      this.userService.getStudentByUsername(this.username).subscribe( student => {
        this.student = student
      })
    }

    //this.isLecturer = this.userService.isLecturer()

  }

  report_as_internship(pk: number) {
    this.vacantPositionService.getVacancy(pk).subscribe( vacancy => {
      let vacantPosition: VacantPosition = vacancy
      if (this.student != null) {
        let internship: Internship2 = {
          pk: 0,
          title: vacantPosition.title,
          description: vacantPosition.description,
          application_status: "o",
          approval_status: "?",
          student: this.student[0].pk,
          company: vacantPosition.company.pk! ////TODO: quickfix with !
        }
        this.internshipService.createInternships(internship).subscribe( response => {
          this.router.navigate(['internship-list'])
        })
      }
    })
  }
  //approval status to "y"
  approve() {
    this.vacancy.approval_status = "y"
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe( () => {
      this.ngOnInit()
    })
  }
  //approval status to "y"
  reject() {
    this.vacancy.approval_status = "n"
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe( () => {
      this.ngOnInit()
    })
  }
  //set currently_open to false
  close() {
    this.vacancy.currently_open = false
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe( () => {
      this.ngOnInit()
    })
  }
  //set currently_open to false, approval status to "n"
  delete() {
    this.vacancy.approval_status = "n"
    this.vacancy.currently_open = false
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe( () => {
      this.ngOnInit()
    })
  }
}
