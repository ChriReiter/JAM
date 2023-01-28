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

  displayedColumns: string[] = ['title', 'company', 'view-button'];

  constructor(private router: Router,
              private vacantPositionService: VacantPositionService,
              private userService: UserService,
              private internshipService: InternshipService) {
  }

  ngOnInit() {
    this.vacantPositionService.getOpenVacancies().subscribe( vacancies => {
      this.vacancies_list = vacancies
    })
  }
  //TODO: Filter User View
  filterUserView() {

  }
}
