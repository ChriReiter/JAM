import {Component} from '@angular/core';
import {Internship, InternshipService} from "../services/internship.service";
import {Student, UserService} from "../services/user.service";
import {DegreeProgram} from "../services/degree-program-service";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-internship-list',
  templateUrl: './internship-list.component.html',
  styleUrls: ['./internship-list.component.scss']
})
export class InternshipListComponent {
  internships: Internship[] = []
  internshipsByStudent: Internship[] = []
  all_internships: Internship[] = []
  students: Student[] = []
  degree_programs: DegreeProgram[] = []
  is_lecturer: boolean = false;
  degree_program: string | null = null


  displayedColumns = ['title', 'application_status', 'approval_status', 'company', 'approve', 'reject', 'update']

  constructor(private http: HttpClient, public internshipService: InternshipService,
              public userService: UserService, private snackbar: MatSnackBar,
              private route: ActivatedRoute, private jwtHelperService: JwtHelperService) {
  }

  readonly accessTokenLocalStorageKey = 'access_token';

  ngOnInit(): void {
    this.degree_program = this.route.snapshot.paramMap.get('degree-program');
    let username = sessionStorage.getItem("username")

    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const userId = decodedToken?.user_id;


    // For Lecturers all internships should be shown, so they can approve/deny them
    if (username != null && !this.userService.isLecturer()) {
      this.internshipService.getInternshipsByStudent().subscribe(internships => {
        this.internships = internships;

        for (let i = 0; i < this.internships.length; i++) {
          if (!(this.internships[i].student == userId))
            this.internships.splice(i, 1);
        }
      })
    } else {
      this.internshipService.getInternshipsByStudent().subscribe(internships => {
        this.internships = internships;
      })
    }
  }

  filterForStudent(filterValue: string | null) {
    this.internships = this.all_internships.filter(internship => {
      return !filterValue || internship.student.username.includes(filterValue)
    })
  }

  filterByDP(degree_program: string) {
    this.internshipService.getInternshipsByDP(degree_program).subscribe(internships => {
      this.internships = internships
    })
  }

  approve(internship_pk: number) {
    this.internshipService.getInternship(internship_pk.toString()).subscribe(internship => {
      internship.approval_status = 'y'
      this.internshipService.updateInternships(internship).subscribe(() => {
        this.ngOnInit()
        this.snackbar.open('Approved Internship: ' + internship.title)
      })
    })
  }

  reject(internship_pk: number) {
    this.internshipService.getInternship(internship_pk.toString()).subscribe(internship => {
      internship.approval_status = 'n'
      this.internshipService.updateInternships(internship).subscribe(() => {
        this.ngOnInit()
        this.snackbar.open('Rejected Internship ' + internship.title)
      })
    })
  }
}
