import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-student-dashboard',
  // templateUrl: './student-dashboard.component.html',
  template: `
    <div style="margin: 35px">
      <h2>My Applications</h2>
      <app-internship-list [defaultSize]="5"></app-internship-list>
      <hr/>
      <h2>Companies</h2>
      <app-company-list [defaultSize]="5"></app-company-list>
      <hr/>
      <h2>Vacancies</h2>
      <app-vacancies-list [defaultSize]="5"></app-vacancies-list>
      <hr/>
      <h2>Calendar</h2>
      <app-calendar></app-calendar>
      <hr/>
    </div>
  `,
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
  }

}
