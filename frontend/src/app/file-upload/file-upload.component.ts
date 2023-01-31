import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FileService} from "../services/file.service";
import {Student, UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtHelperService} from "@auth0/angular-jwt";

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
              private snackBar: MatSnackBar, private jwtHelperService: JwtHelperService) {
    this.formGroup = new FormGroup({
      fileUpload: new FormControl([])
    })
  }

  readonly accessTokenLocalStorageKey = 'access_token';
  //TODO: Adjust UI Design
  ngOnInit() {
    let username = sessionStorage.getItem("username")
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const userId = decodedToken?.user_id;
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
