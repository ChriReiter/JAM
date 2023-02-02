import {Component, Inject, Input} from '@angular/core';
import {CalendarComponent} from "../calendar/calendar.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  @Input()
  report_no: number = 0
  @Input()
  degree_program: number = 0

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService){}
}
