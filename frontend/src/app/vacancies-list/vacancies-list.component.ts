import { Component } from '@angular/core';
import {Internship2, InternshipService} from "../services/internship.service";
import {VacantPosition, VacantPositionService} from "../services/vacant-position.service";
import {Router} from "@angular/router";
import {Student, UserService} from "../services/user.service";

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent {
  vacancies_list: VacantPosition[] = []
  username: string | null = null;
  student: Student[] = [];

  constructor(private router: Router,
              private vacantPositionService: VacantPositionService,
              private userService: UserService,
              private internshipService: InternshipService) {
  }

  ngOnInit() {
    this.vacantPositionService.getVacancies().subscribe( vacancies => {
      this.vacancies_list = vacancies
    })
    this.username = sessionStorage.getItem("username")
    if (this.username != null) {
      this.userService.getStudentByUsername(this.username).subscribe( student => {
        this.student = student
      })


    }
  }

  approve(pk: number) {
    this.vacantPositionService.getVacancy(pk).subscribe( vacancy => {
      //vacancy.approval_status = "y"
      this.vacantPositionService.updateVacancy(vacancy).subscribe( () => {
        console.log("approved" + pk)
        this.ngOnInit()
      })
    })

  }

  reject(pk: number) {
    this.vacantPositionService.getVacancy(pk).subscribe( vacancy => {

      this.vacantPositionService.updateVacancy(vacancy).subscribe( () => {
        this.ngOnInit()
      })
    })
  }

  report_as_internship(pk: number) {
    this.vacantPositionService.getVacancy(pk).subscribe( vacancy => {
      let vacantPosition: VacantPosition = vacancy
      if (this.student != null) {
        console.log(this.student[0].pk)
        let internship: Internship2 = {
          pk: 0,
          title: vacantPosition.title,
          description: vacantPosition.description,
          application_status: "o",
          approval_status: "?",
          student: this.student[0].pk,
          company: vacantPosition.company.pk
        }
        this.internshipService.createInternships(internship).subscribe( response => {
          console.log("successfully created internship: " + response)
          this.router.navigate(['internship-list'])
        })

      }


    })


  }
}
