import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Student} from "./user.service";

export interface Internship {
  pk: number;
  title: string;
  description: string;
  application_status: string;
  approval_status: string;
  student: Student;
  // company: Company_DB;
}

////TODO: Get To gork with one Interface
export interface Internship2 {
  pk: number;
  title: string;
  description: string;
  application_status: string;
  approval_status: string;
  student: number;
  company: number;
}

@Injectable({
    providedIn: 'root'
})
export class InternshipService {

    constructor(private http: HttpClient) { }

    getInternships() {
        return this.http.get<Internship[]>(`${environment.apiBaseUrl}/internships/`);
    }

    getInternship(id: string) {
        return this.http.get<Internship>(`${environment.apiBaseUrl}/internships/${id}`);
    }

    getInternshipsByDP(degree_program: string) {
        return this.http.get<Internship[]>(`${environment.apiBaseUrl}/internships/?dp=` + degree_program);
    }

    getInternshipsByStudent(student: string) {
        return this.http.get<Internship[]>(`${environment.apiBaseUrl}/internships/?student=` + student);
    }

    createInternships(internship: Internship2) {
        return this.http.post(`${environment.apiBaseUrl}/internships/`, internship)
    }
    updateInternships(internship: Internship) {
        return this.http.put(`${environment.apiBaseUrl}/internships/` + internship.pk, internship);
    }

    mapAbbToFull(status_string: string) {
        if (status_string === "a") {
            return "applied"
        } else if (status_string === "t") {
            return "talks ongoing"
        } else if (status_string === "y") {
            return "accepted"
        } else if (status_string === "n") {
            return "rejected"
        } else {
            return "other"
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
}
