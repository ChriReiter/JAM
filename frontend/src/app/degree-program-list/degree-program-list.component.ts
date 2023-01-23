import { Component } from '@angular/core';
import {DegreeProgram} from "../services/degree-program-service";
import {HttpClient} from "@angular/common/http";
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
              private userService: UserService) {
    this.formGroup = new FormGroup({
      fileUpload: new FormControl([])
    })
  }
  ngOnInit(): void {
    this.http.get<DegreeProgram[]>('http://localhost:8000/api/degree-programmes/').subscribe(degree_programs => {
      this.degree_programs = degree_programs
    })

    this.userService.getStudentByUsername("fayzhadi20").subscribe(student => {
      this.student = student[0]
    })
  }

  onChange(event: any) {
    /*
    this.file = event.target.files[0]
    console.log(this.file)
    if (this.student != null && this.file != undefined) {
      this.fileService.uploadFile(this.file, this.student).subscribe( response => {
        console.log(response)
      })
    }
     */
  }
}
