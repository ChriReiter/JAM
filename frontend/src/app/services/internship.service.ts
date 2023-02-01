import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Company_DB} from "./company.service";
import {Student} from "./user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

export interface Internship {
  pk: number;
  title: string;
  description: string;
  application_status: string;
  approval_status: string;
  student: Student;
  company: Company_DB;
}

////TODO: Get To gork with one Interface
export interface Internship2 {
  pk: number;
  title: string;
  description: string;
  application_status: string;
  approval_status: string;
  student: number;
  company: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  internships: Internship[] = [];
  internshipsByStudent: Internship[] = [];

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {
  }

  readonly accessTokenLocalStorageKey = 'access_token';

  getInternships() {
    return this.http.get<Internship[]>(`${environment.apiBaseUrl}/internships/`);
  }

  getInternship(id: string) {
    return this.http.get<Internship>(`${environment.apiBaseUrl}/internships/${id}`);
  }

  getInternshipsByDP(degree_program: string) {
    return this.http.get<Internship[]>(`${environment.apiBaseUrl}/internships/?dp=` + degree_program);
  }

  getInternshipsByStudent() {
    return this.http.get<Internship[]>(`${environment.apiBaseUrl}/internships/`)
  }


  createInternships(internship: Internship2) {
    return this.http.post(`${environment.apiBaseUrl}/internships/`, internship)
  }

  updateInternships(internship: Internship) {
    return this.http.put(`${environment.apiBaseUrl}/internships/` + internship.pk, internship);
  }

  mapStatusAbbToFull(status_string: string): string {
    switch (status_string) {
      case "a":
        return "Applied"
      case "t":
        return "Talks ongoing"
      case "y":
        return "Accepted"
      case "n":
        return "Rejected"
      default:
        return "Other"
    }
  }

  mapApprovalStatusToFull(status_string: string): string {
    switch (status_string) {
      case "?":
        return "Waiting for approval"
      case "y":
        return "Approved"
      case "n":
        return "Rejected"
      default:
        return "Other"
    }
  }

  mapFullToAbb(status_num: number): string {
    switch (status_num) {
      case 1:
        return "a"
      case 2:
        return "t"
      case 3:
        return "y"
      case 4:
        return "n"
      default:
        return "o"
    }
  }
}
