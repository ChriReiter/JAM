import { Component } from '@angular/core';
import {Internship, InternshipService} from "../services/internship.service";
import {Student, UserService} from "../services/user.service";
import {DegreeProgram} from "../services/degree-program-service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-internship-list',
  templateUrl: './internship-list.component.html',
  styleUrls: ['./internship-list.component.scss']
})
export class InternshipListComponent {
  internships: Internship[] = []
  all_internships: Internship[] = []
  students: Student[] = []
  degree_programs: DegreeProgram[] = []
  is_lecturer: boolean = false;
  degree_program: string | null = null


  displayedColumns = ['title', 'application_status', 'approval_status', 'company', 'approve', 'reject', 'update']

  constructor(private http: HttpClient, private internshipService: InternshipService,
              public userService: UserService, private snackbar: MatSnackBar,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.degree_program = this.route.snapshot.paramMap.get('degree-program');
    let username = sessionStorage.getItem("username")
    // this.http.get<Lecturer[]>(`${environment.apiBaseUrl}/lecturers/`).subscribe(lecturers => {
    //   this.is_lecturer = lecturers.filter(lecturer => lecturer.email === username).length === 1
    //
    //   if (username != null && !this.is_lecturer) {
    //     this.internshipService.getInternshipsByStudent(username).subscribe(internships => {
    //       this.internships = internships
    //     })
    //   } else if (this.degree_program != null && this.is_lecturer) {
    //     this.filterByDP(this.degree_program)
    //   } else {
    //     this.internships = []
    //   }
    // })
    if (username != null) {
      this.internshipService.getInternshipsByStudent(username).subscribe(internships => {
        this.internships = internships
      })

    }
  }

  filterForStudent(filterValue: string | null) {
    this.internships = this.all_internships.filter(internship => {
      return !filterValue || internship.student.username.includes(filterValue)
    })
  }

  filterByDP(degree_program: string) {
    this.internshipService.getInternshipsByDP(degree_program).subscribe( internships => {
      this.internships = internships
    })
  }

  approve(internship_pk: number) {
    this.internshipService.getInternship(internship_pk.toString()).subscribe(internship => {
      internship.approval_status = 'y'
      this.internshipService.updateInternships(internship).subscribe(() => {
        this.ngOnInit()
        this.snackbar.open('approved internship: ' + internship.title)
      })
    })

  }

  reject(internship_pk: number) {
    this.internshipService.getInternship(internship_pk.toString()).subscribe(internship => {
      internship.approval_status = 'n'
      this.internshipService.updateInternships(internship).subscribe(() => {
        this.ngOnInit()
        this.snackbar.open('rejected internship ' + internship.title)
      })
    })
  }
}
