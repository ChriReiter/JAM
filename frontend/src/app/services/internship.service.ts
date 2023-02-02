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
  user: number;
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

  getInternship2(id: string) {
    return this.http.get<Internship2>(`${environment.apiBaseUrl}/internships/${id}`);
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
    if (status_num == 1) {
      return "a"
    } else if (status_num == 2) {
      return "t"
    } else if (status_num == 3) {
      return "y"
    } else if (status_num == 4) {
      return "n"
    } else {
      return "o"
    }
  }

  mapAbbToFull(abb: string): string {
    if (abb == "a") {
      return "1"
    } else if (abb == "t") {
      return "2"
    } else if (abb == "y") {
      return "3"
    } else if (abb == "n") {
      return "4"
    } else {
      return "5"
    }
  }
}
