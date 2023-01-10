import { Component } from '@angular/core';
import {DegreeProgram} from "../services/degree-program-service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-degree-program-list',
  templateUrl: './degree-program-list.component.html',
  styleUrls: ['./degree-program-list.component.scss']
})
export class DegreeProgramListComponent {
  degree_programs: DegreeProgram[] = []
  displayedColumns = ['name', 'abbreviation', 'current_class', 'internships',
    'deadline_application', 'internship_start', 'internship_end',
    'deadline_report1', 'deadline_report2', 'deadline_report3']


  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.http.get<DegreeProgram[]>('http://localhost:8000/api/degree-programmes/').subscribe(degree_programs => {
      this.degree_programs = degree_programs
    })
  }
}
