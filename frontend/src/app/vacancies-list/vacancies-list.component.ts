import {Component} from '@angular/core';
import {Internship2, InternshipService} from "../services/internship.service";
import {VacantPosition, VacantPositionService} from "../services/vacant-position.service";
import {Router} from "@angular/router";
import {Student, User, UserService} from "../services/user.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent {
  vacancies_list: VacantPosition[] = []
  username: string | null = null;
  user: User | null = null;

  approval_status: string = "?"

  length = 100;
  pageSize = 5;
  pageIndex = 0;
  pageEvent: PageEvent;

  displayedColumns: string[] = ['title', 'company', 'approval_status', 'view-button'];

  constructor(private router: Router,
              public vacantPositionService: VacantPositionService,
              private userService: UserService,
              private internshipService: InternshipService) {
    this.pageEvent = new PageEvent();
  }

  ngOnInit() {

    this.vacantPositionService.getOpenVacancies().subscribe(vacancies => {
      if (this.userService.isLecturer()) {
        this.approval_status = "?"
        this.vacancies_list = vacancies.filter(vacancy => vacancy.approval_status == "?").slice(0, 5)
      } else {
        this.approval_status = "y"
        this.vacancies_list = vacancies.filter(vacancy => vacancy.approval_status == "y").slice(0, 5)
      }
    })
  }

  //TODO: Filter for DegreeProgram (waiting for user-service)
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.vacantPositionService.getVacancies().subscribe(vacancies => {
      this.vacancies_list = vacancies
        .filter(vacancy => vacancy.approval_status === this.approval_status && vacancy.currently_open)
        //.filter(vacancy => vacancy.degree_program.includes(this.degree_program)))
        .slice(this.pageIndex * this.pageSize, (this.pageIndex * this.pageSize) + this.pageSize)
    })
  }
}
