import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Company_DB} from "./company.service";
import {DegreeProgram} from "./degree-program-service";

export interface VacantPosition {
    pk: number;
    title: string;
    description: string;
    currently_open: boolean;
    approval_status: string;
    company: Company_DB;
    degree_program: DegreeProgram[];
}

export interface VacantPositionCreate {
    pk: number;
    title: string;
    description: string;
    currently_open: boolean;
    approval_status: string;
    company: number;
    degree_program: number[];
}

@Injectable({
    providedIn: 'root'
})
export class VacantPositionService {

    constructor(private http: HttpClient) {
    }

    getVacancies() {
        return this.http.get<VacantPosition[]>(`${environment.apiBaseUrl}/vacant-positions/`);
    }

    getVacancy(pk: number) {
        return this.http.get<VacantPosition>(`${environment.apiBaseUrl}/vacant-positions/` + pk);
    }

    createVacancy(vacancy: VacantPositionCreate) {
        return this.http.post(`${environment.apiBaseUrl}/vacant-positions/`, vacancy)
    }

    updateVacancy(vacancy: VacantPosition) {
        return this.http.put<VacantPosition>(`${environment.apiBaseUrl}/vacant-positions/` + vacancy.pk, vacancy)
    }


}
