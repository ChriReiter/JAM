import {Student} from "./user.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class FileService {
  constructor(private http: HttpClient) {

  }
  uploadFile(file: File, student: Student) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name)
    uploadData.append('student', student.pk.toString())
    return this.http.post(`${environment.apiBaseUrl}/files/`, uploadData)
  }

  /*
  Demo in Degree-Program-List component, short summary here:
  To actually upload a file, files will be stored in the /backend/jam/files folder:

  - Add an Event-Listener to a FormGroup

  <form [formGroup]="formGroup">
    ...
    <input type="file" name="fileInput" (change)="onChange($event)"/>
  </form>

  - implement the onChange function, that the current File is read from the input field

  onChange(event: any) {
    this.file = event.target.files[0]
    ...
  }

  - call the uploadFile(file, student) from the fileService

  this.fileService.uploadFile(this.file, this.student).subscribe( response => {
        ...
      })
   */
}
