import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/daygrid';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog"


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  constructor(private dialog: MatDialog) {}
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    events: [
      { title: 'event 1', date: '2023-01-01' },
      { title: 'event 2', date: '2023-01-25' },
      { title: 'event 3', start: '2023-01-15',end: '2023-01-20' }
    ],
    headerToolbar:{
      start: 'prev,next',
      center:  'title',
      end: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    eventClick: this.handleDateClick.bind(this)
  };

  handleDateClick(arg: any) {
    alert(arg.event._def.title)
  }
}
