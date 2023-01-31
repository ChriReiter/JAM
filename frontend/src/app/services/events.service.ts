import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DegreeProgram} from "./degree-program-service";


export interface CalEvent{
 // pk: number;
  title: string;
  allDay: boolean;
  start: string;
  end : string;
  editable: boolean;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  extendedProps: string;
  source: string;
  className: string;
}

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private http: HttpClient) {
  }
  getEvents() {
    return this.http.get<CalEvent[]>(`${environment.apiBaseUrl}/events/`);
  }
  getEventByDegreeProgram(className: string){
    return this.http.get<Object>(`${environment.apiBaseUrl}/events/?className` + className);
  }

}
