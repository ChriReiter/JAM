import {Component} from '@angular/core';
import {VacantPosition, VacantPositionService} from "../services/vacant-position.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Company_DB} from "../services/company.service";
import {Internship2, InternshipService} from "../services/internship.service";
import {Student, UserService} from "../services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {EmailService} from "../services/email-service";

@Component({
  selector: 'app-vacancies-view',
  templateUrl: './vacancies-view.component.html',
  styleUrls: ['./vacancies-view.component.scss']
})
export class VacanciesViewComponent {
  company: Company_DB = {
    pk: 0,
    name: "",
    orb_num: "",
    custom_companies: null,
    approval_status: "n"
  }
  vacancy: VacantPosition = {
    pk: 0,
    title: "",
    description: "",
    currently_open: false,
    approval_status: "?",
    company: this.company,
    degree_program: []
  }
  vacancy_pk: string | null = null;
  username: string | null = null
  student: Student[] = []

  student_id: number | null = null

  isLecturer: boolean = false

  mailRecipients: string[] = []

  vacancy_status_ui: String = ""

  constructor(private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private vacantPositionService: VacantPositionService,
              private internshipService: InternshipService, public userService: UserService,
              private jwtHelperService: JwtHelperService, private emailService: EmailService) {

  }

  readonly accessTokenLocalStorageKey = 'access_token';

  //TODO: maybe put link to company in detail view?
  ngOnInit() {
    this.vacancy_pk = this.route.snapshot.paramMap.get('vacant-position-pk');
    if (this.vacancy_pk != null) {
      this.vacantPositionService.getVacancy(parseInt(this.vacancy_pk)).subscribe(vacancy => {
        this.vacancy = vacancy
        this.vacancy_status_ui = this.vacantPositionService.approvalStatusMapper(this.vacancy.approval_status)
      })
    }
    this.username = sessionStorage.getItem("username")

    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const userId = decodedToken?.user_id;
    this.student_id = userId
    this.mailRecipients = this.emailService.getMailReceivers()
  }

  //TODO: Creating internship does not work yet, API error
  report_as_internship(pk: number) {
    this.vacantPositionService.getVacancy(pk).subscribe(vacancy => {
      let vacantPosition: VacantPosition = vacancy

      let internship: Internship2 = {
        pk: 0,
        title: vacantPosition.title,
        description: vacantPosition.description,
        application_status: "a",
        approval_status: vacancy.approval_status,
        user: this.student_id!,
        company: vacantPosition.company.pk!
      }
      this.internshipService.createInternships(internship).subscribe(response => {
        this.router.navigate(['internship-list'])
      })
    })
  }

  //approval status to "y"
  approve() {
    this.vacancy.approval_status = "y"
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe(() => {
      this.emailService.sendEmail(this.emailService.mailBuilder(
        "New Vacancy Added",
        "Hi!\n\n The vacancy \"" + this.vacancy!.title + "\" was just added to the database!\n\n" +
        "Apply quickly before its too late!\n\n" +
        "Best regards, \nyour JAM-Team",
        this.mailRecipients
      )).subscribe()
      this.router.navigate(["vacancies-list"])
      this.ngOnInit()
    })
  }

  //approval status to "n"
  reject() {
    this.vacancy.approval_status = "n"
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe(() => {
      this.ngOnInit()
    })
  }

  //set currently_open to false
  close() {
    this.vacancy.currently_open = false
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe(() => {
      this.ngOnInit()
    })
  }

  //set currently_open to false, approval status to "n"
  delete() {
    this.vacancy.approval_status = "n"
    this.vacancy.currently_open = false
    this.vacantPositionService.updateVacancy(this.vacancy).subscribe(() => {
      this.ngOnInit()
    })
  }
}
