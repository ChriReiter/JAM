import { Component } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  // templateUrl: './student-dashboard.component.html',
  template: `
    <div>
      <h1>My Applications</h1>
      <app-internship-list></app-internship-list>
    </div>
  `,
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {

}
