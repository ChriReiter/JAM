import {Component, Input} from '@angular/core';
import {Internship2, InternshipService} from "../services/internship.service";
import {VacantPosition, VacantPositionService} from "../services/vacant-position.service";
import {Router} from "@angular/router";
import {Student, User, UserService} from "../services/user.service";
import {PageEvent} from "@angular/material/paginator";
import {Company_DB} from "../services/company.service";
import {DegreeProgram} from "../services/degree-program-service";

export interface Vacancy {
  pk: number;
  company: Company_DB;
  degree_program: DegreeProgram;
  title: string;
  description: string;
  currently_open: boolean;
  approval_status: string;
}

@Component({
  selector: 'app-vacancies-list',
  templateUrl: './vacancies-list.component.html',
  styleUrls: ['./vacancies-list.component.scss']
})
export class VacanciesListComponent {
  @Input()
  defaultSize=10;

  onRowClicked(row: any) {
    this.router.navigate([`vacant-positions/${row.pk}`])
  }

  vacancies_list: VacantPosition[] = []
  username: string | null = null;
  user: User | null = null;

  approval_status: string = "?"

  length = 100;
  pageSize = this.defaultSize;
  pageIndex = 0;
  pageEvent: PageEvent;

  displayedColumns: string[] = ['title', 'company', 'approval_status'];

  constructor(private router: Router,
              public vacantPositionService: VacantPositionService,
              private userService: UserService,
              private internshipService: InternshipService) {
    this.pageEvent = new PageEvent();
  }

  ngOnInit() {
    this.pageSize = this.defaultSize
    this.vacantPositionService.getOpenVacancies().subscribe(vacancies => {
      if (this.userService.isLecturer()) {
        this.approval_status = "?"
        this.vacancies_list = vacancies.filter(vacancy => vacancy.approval_status == "?").slice(0, this.pageSize)
      } else {
        this.approval_status = "y"
        this.vacancies_list = vacancies.filter(vacancy => vacancy.approval_status == "y").slice(0, this.pageSize)
      }
    })

  }

  //no degree-program-specific filtering implemented
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.vacantPositionService.getVacancies().subscribe(vacancies => {
      this.vacancies_list = vacancies
        .filter(vacancy => vacancy.approval_status === this.approval_status && vacancy.currently_open)
        .slice(this.pageIndex * this.pageSize, (this.pageIndex * this.pageSize) + this.pageSize)
    })
  }
}
