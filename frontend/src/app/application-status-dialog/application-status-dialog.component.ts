import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Internship, InternshipService} from "../services/internship.service";

@Component({
  selector: 'app-application-status-dialog',
  templateUrl: './application-status-dialog.component.html',
  styleUrls: ['./application-status-dialog.component.scss']
})
export class ApplicationStatusDialogComponent {
  applicationStatusFormGroup: FormGroup

  application_status: string = ""
  internship: Internship | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private internshipService: InternshipService) {
    this.applicationStatusFormGroup = new FormGroup({
      application_status: new FormControl([]),
    })
  }

  ngOnInit() {
    this.applicationStatusFormGroup.valueChanges.subscribe( res => {
      this.application_status = this.internshipService.mapFullToAbb(res.application_status)
    })
    this.internshipService.getInternship(this.data.internship_pk).subscribe( int => {
      this.internship = int
    })
  }

  update() {
    if (this.application_status != "") {
      console.log("update")
      let updatedInternship: Internship = {
        pk: this.internship!.pk,
        title: this.internship!.title,
        description: this.internship!.title,
        application_status: this.application_status,
        approval_status: this.internship!.approval_status,
        student: this.internship!.student,
        company: this.internship!.company
      }
      this.internshipService.updateInternships(updatedInternship).subscribe()
    }


  }
}

