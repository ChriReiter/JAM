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
  uploadFile(file: File, student: number, report_no: string) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name)
    uploadData.append('student', student.toString())
    uploadData.append('report_no', report_no)
    return this.http.post(`${environment.apiBaseUrl}/files/`, uploadData)
  }
}
