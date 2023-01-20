import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export interface DegreeProgram {
    pk: number;
    name: string;
    abbreviation: string;
    current_class: string;
    deadline_application: Date;
    internship_start: Date;
    internship_end: Date;
    deadline_report1: Date;
    deadline_report2: Date;
    deadline_report3: Date;
}

@Injectable({
    providedIn: 'root'
})
export class DegreeProgramService {

    constructor(private http: HttpClient) {
    }

    getDegreePrograms() {
        return this.http.get<DegreeProgram[]>(`${environment.apiBaseUrl}/degree-programmes/`);
    }

    getDegreeProgram(pk: number) {
        return this.http.get<DegreeProgram>(`${environment.apiBaseUrl}/degree-programmes/` + pk);
    }

    getDegreeProgramByUsername(username: string) {
        return this.http.get<DegreeProgram[]>(`${environment.apiBaseUrl}/degree-programmes/?username=` + username)
    }


    updateDegreeProgram(degreeProgram: DegreeProgram) {
        return this.http.put<DegreeProgram>(`${environment.apiBaseUrl}/degree-programmes/` + degreeProgram.pk, degreeProgram)
    }
}
