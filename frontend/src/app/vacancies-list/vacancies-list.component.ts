import {Component} from '@angular/core';
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

  displayedColumns: string[] = ['title', 'company', 'approval_status', 'view-button'];

  constructor(private router: Router,
              public vacantPositionService: VacantPositionService,
              private userService: UserService,
              private internshipService: InternshipService) {
  }

  ngOnInit() {
    // Student: open vacancies; status
    // Lecturer: all vacancies with option to approve/deny and close


    this.vacantPositionService.getOpenVacancies().subscribe(vacancies => {
      this.vacancies_list = vacancies
    })
    this.username = sessionStorage.getItem("username")
    if (this.username != null) {
      this.userService.getStudentByUsername(this.username).subscribe(student => {
        this.student = student
        if (this.student[0] != null) {
          this.vacantPositionService.getVacanciesForStudent(this.student[0].pk).subscribe(vacancies => {
            this.vacancies_list = vacancies
          })
        } else {
          this.vacantPositionService.getVacanciesForLecturer(1).subscribe(vacancies => {
            this.vacancies_list = vacancies
          })
        }
      })

    }
  }
}
