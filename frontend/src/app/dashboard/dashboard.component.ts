import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <div *ngIf="userService.isLecturer$ | async; then lecturer; else student"></div>
      <ng-template #lecturer>
        <app-lecturer-dashboard></app-lecturer-dashboard>
      </ng-template>
      <ng-template #student>
        <app-student-dashboard></app-student-dashboard>
      </ng-template>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(public userService: UserService) {
  }

}
