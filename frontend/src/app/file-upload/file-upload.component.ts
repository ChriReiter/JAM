import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FileService} from "../services/file.service";
import {Student, UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  formGroup: FormGroup;
  file: File | null = null;
  student: number = -1;
  constructor(private fileService: FileService, private userService: UserService,
              private snackBar: MatSnackBar) {
    this.formGroup = new FormGroup({
      fileUpload: new FormControl([])
    })
  }
  //TODO: Adjust UI Design
  //TODO: Add FileType (Report 1, 2 or 3) in Backend
  ngOnInit() {
    let username = sessionStorage.getItem("username")
    this.student = this.userService.getStudentId(sessionStorage.getItem("username")!)
  }

  onChange(event: any) {
    this.file = event.target.files[0]
  }

  upload() {
    if (this.file != null) {
      this.fileService.uploadFile(this.file!, this.student).subscribe()
    } else {
      this.snackBar.open("Please select a file first!")
    }

  }
}
