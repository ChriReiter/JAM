import { Component } from '@angular/core';
import {DegreeProgram, DegreeProgramService} from "../services/degree-program-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FileService} from "../services/file.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Student, UserService} from "../services/user.service";

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
  formGroup: FormGroup;
  file: File | undefined;

  student: Student | null = null;



  constructor(private http: HttpClient, private fileService: FileService,
              private userService: UserService, private degreeProgramService: DegreeProgramService) {
    this.formGroup = new FormGroup({
      fileUpload: new FormControl([])
    })
  }
  ngOnInit(): void {
    this.degreeProgramService.getDegreeProgramByUsername(sessionStorage.getItem("username")!).subscribe( dp => {
      this.degree_programs = dp
    })
  }
}
