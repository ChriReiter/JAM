import { Component } from '@angular/core';

@Component({
  selector: 'app-lecturer-dashboard',
  //templateUrl: './lecturer-dashboard.component.html',
  template: `
    <div style="margin: 35px">
      <h2>Applications</h2>
      <app-internship-list [defaultSize]="5"></app-internship-list>
      <hr/>
      <h2>Companies</h2>
      <app-company-list [defaultSize]="5"></app-company-list>
      <hr/>
      <h2>Vacancies</h2>
      <app-vacancies-list [defaultSize]="5"></app-vacancies-list>
    </div>
  `,
  styleUrls: ['./lecturer-dashboard.component.scss']
})
export class LecturerDashboardComponent {

}
