import {Component, Inject} from '@angular/core';
import {CalendarOptions, EventInput, EventSourceInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/daygrid';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog"
import {DegreeProgram, DegreeProgramService} from "../services/degree-program-service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {DialogComponent} from "../dialog/dialog.component";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  constructor(private dialog: MatDialog, private http: HttpClient, private userService: UserService,
              private degreeProgramService :DegreeProgramService) {}
  eventsNew: any[] = []
  tempEvent: any[] =[]
  dialogRef!: MatDialogRef<DialogComponent>
  config: MatDialogConfig = {
    height: '300px',
    width: '400px',
    data: {
      event: [],
      date: []
    }
  }

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
   // alert(arg.event._def.title)
    this.config.data = {event: arg.event._def.title, date: arg.event._def.end}
    this.dialogRef = this.dialog.open(DialogComponent, this.config);
    this.dialogRef.componentInstance.degree_program = arg.event._def.extendedProps.dp_pk
    this.dialogRef.componentInstance.report_no = arg.event._def.extendedProps.report
  }

  getAllEvents(){
    this.degreeProgramService.getDegreeProgramByPk(this.userService.getUserPk()).subscribe(degree_programs => {
      for (let degree_program of degree_programs){
        this.tempEvent =  [
       // this.calendarOptions.events =[
          {title: 'Deadline application - '+degree_program.name,start: degree_program.deadline_report1.toString(), end: degree_program.deadline_report1.toString(), backgroundColor: degree_program.backgroundColor},
          {title: 'Internship start - '+degree_program.name,start: degree_program.internship_start.toString(), end: degree_program.internship_start.toString(), backgroundColor: degree_program.backgroundColor},
          {title: 'Internship end - '+degree_program.name,start: degree_program.internship_end.toString(), end: degree_program.internship_end.toString(), backgroundColor: degree_program.backgroundColor},
          {title: 'Deadline report1 - '+degree_program.name,start: degree_program.deadline_report1.toString(), end: degree_program.deadline_report1.toString(), backgroundColor: degree_program.backgroundColor, report: 1, dp_pk:degree_program.pk},
          {title: 'Deadline report2 - '+degree_program.name,start: degree_program.deadline_report2.toString(), end: degree_program.deadline_report2.toString(), backgroundColor: degree_program.backgroundColor, report: 2, dp_pk:degree_program.pk},
          {title: 'Deadline report3 - '+degree_program.name,start: degree_program.deadline_report3.toString(), end: degree_program.deadline_report3.toString(), backgroundColor: degree_program.backgroundColor, report: 3, dp_pk:degree_program.pk}
        ]
        this.eventsNew = this.eventsNew.concat(this.tempEvent)
        this.calendarOptions.events = this.eventsNew;
      }
    })
  }
  }
