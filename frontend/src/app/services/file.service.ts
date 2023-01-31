import {Student, User} from "./user.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class FileService {
  constructor(private http: HttpClient) {

  }
  //TODO: Replace models.Students. with models.Users. in API, change number to User (only for compilation)
  uploadFile(file: File, student: number) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name)
    uploadData.append('student', student.toString())
    uploadData.append('student', student.toString())
    return this.http.post(`${environment.apiBaseUrl}/files/`, uploadData)
  }
}
