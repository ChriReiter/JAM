import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FileService} from "../services/file.service";
import {Student, UserService} from "../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {ICON_REGISTRY_PROVIDER_FACTORY} from "@angular/material/icon";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input()
  report_no: number = 0
  @Input()
  degree_program = 0
  @Input()
  dialogRef: MatDialogRef<DialogComponent> | null = null
  formGroup: FormGroup;
  file: File | null = null;
  student: number = -1;
  fileName = '';
  constructor(private fileService: FileService, private userService: UserService,
              private snackBar: MatSnackBar, private jwtHelperService: JwtHelperService, private router:Router) {
    this.formGroup = new FormGroup({
      fileUpload: new FormControl([])
    })
  }

  readonly accessTokenLocalStorageKey = 'access_token';
  //TODO: Adjust UI Design
  ngOnInit() {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const userId = decodedToken?.user_id;

    this.student = userId;
  }

  onChange(event: any) {
    this.file = event.target.files[0]
    if (this.file)
      this.fileName = this.file.name;
  }

  upload() {
    if (this.file != null) {
      this.fileService.uploadFile(this.file!, this.student, this.report_no, this.degree_program).subscribe(x=>{
        this.snackBar.open("File Successfully uploaded", 'OK', {duration: 3000})
        if(this.dialogRef)
         this.dialogRef.close()
        }
      )
    } else {
      this.snackBar.open("Please select a file first!", 'OK', {duration: 3000})
    }

  }
}
