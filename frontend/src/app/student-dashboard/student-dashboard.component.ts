import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-student-dashboard',
  // templateUrl: './student-dashboard.component.html',
  template: `
    <div>
<!--      <h1>My Applications</h1>-->
<!--      <div *ngIf="this.userService.isLecturer('user10') | async; then lecturer; else student"></div>-->
<!--      <ng-template #lecturer>-->
<!--        <app-degree-program-list></app-degree-program-list>-->
<!--      </ng-template>-->
<!--      <ng-template #student>-->
<!--        <app-internship-list></app-internship-list>-->
<!--      </ng-template>-->
      <app-internship-list></app-internship-list>
    </div>
  `,
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit{

  constructor(public userService:UserService) {
  }

  ngOnInit(): void {
    this.userService.isLecturer("user10").subscribe(result => {
      console.log(result);
    })
  }

}
