import { Component } from '@angular/core';
import {CalendarOptions, EventInput, EventSourceInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/daygrid';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog"
import {EventService} from "../services/events.service";
import {DegreeProgram} from "../services/degree-program-service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CalEvent} from "../services/events.service";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  //degree_programs: DegreeProgram[] = []
  //eventsDB:



  constructor(private dialog: MatDialog, private eventService: EventService, private http: HttpClient) {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    headerToolbar:{
    start: 'prev,next',
    center:  'title',
    end: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: '',

    eventClick: this.handleDateClick.bind(this)
  };

  ngOnInit() {
    this.getAllEvents();
  }

  handleDateClick(arg: any) {
    alert(arg.event._def.title)
  }
  getAllEvents(){
    this.http.get<DegreeProgram[]>(`${environment.apiBaseUrl}/degree-programmes/`).subscribe(degree_programs => {
      for (let degree_program of degree_programs){
        this.calendarOptions.events = [{title: 'Deadline application',start: degree_program.deadline_report1.toString(), end: degree_program.deadline_report1.toString()},
                                       {title: 'Internship start',start: degree_program.internship_start.toString(), end: degree_program.internship_start.toString()},
                                       {title: 'Internship end',start: degree_program.internship_end.toString(), end: degree_program.internship_end.toString()},
                                       {title: 'Deadline report1',start: degree_program.deadline_report1.toString(), end: degree_program.deadline_report1.toString()},
                                       {title: 'Deadline report2',start: degree_program.deadline_report2.toString(), end: degree_program.deadline_report2.toString()},
                                       {title: 'Deadline report3',start: degree_program.deadline_report3.toString(), end: degree_program.deadline_report3.toString()}

        ]
        //this.eventService.getEventByDegreeProgram(degree_program.pk.toString()).subscribe(events => {
          //this.calendarOptions.events = events})


      }
    })
  }
}
