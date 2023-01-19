import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Company_DB} from "./company.service";
import {VacantPosition, VacantPositionCreate} from "./vacant-position.service";
import {User, UserService} from "./user.service";
import {DegreeProgramService} from "./degree-program-service";

export interface Mail {
  subject: string,
  message: string,
  recipients: string[]
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient, private userService: UserService,
              private degreeProgramService: DegreeProgramService) {

  }
  //use this function to easily build emails
  mailBuilder(subject: string, message: string, recipients: string[]) {
    let mail: Mail = {
      subject: subject,
      message: message,
      recipients: recipients
    }
    return mail
  }
  //use this function to send your emails
  sendEmail(mail: Mail) {
    return this.http.post(`${environment.apiBaseUrl}/send-mail/`, mail)
  }
  //optional, but recommended for sub-topics
  sendVacancyMails(vacancy: VacantPositionCreate, username: string) {
    /*
    Waiting for updated User/Student/Lecturer classes
    called when creating or accepting/rejecting vacancies
    When username belongs to student -> notify all lecturers of degree program for acceptance/rejection
    When username belongs to lecturer -> notify all students of degree programs
     */
  }
}
