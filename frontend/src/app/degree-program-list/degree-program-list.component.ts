import {ChangeDetectorRef, Component} from '@angular/core';
import {DegreeProgram, DegreeProgramService} from "../services/degree-program-service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FileService} from "../services/file.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Student, UserService} from "../services/user.service";
import {D} from "@angular/cdk/keycodes";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

export interface ReportOk{
  ok: boolean;
  dp_pk: number;
  report:number;
}

@Component({
  selector: 'app-degree-program-list',
  templateUrl: './degree-program-list.component.html',
  styleUrls: ['./degree-program-list.component.scss']
})

export class DegreeProgramListComponent {
  degree_programs: DegreeProgram[] = []
  degProgramFormGroup: FormGroup;
    displayedColumns = ['name', 'abbreviation', 'current_class',
    'deadline_application', 'internship_start', 'internship_end',
    'deadline_report1', 'edit']
  formGroup: FormGroup;
  file: File | undefined;
  editId: number | null = 0;
  student: Student | null = null;
  initDate: Date;
  dialogRef!: MatDialogRef<DialogComponent>
  fileUploadConfig: MatDialogConfig = {
    height: '300px',
    width: '400px',
    data: {
      event: [],
      date: []
    }
  }
  reports: ReportOk[] | null
  constructor(private http: HttpClient,
              public fileService: FileService,
              public userService: UserService,
              private degreeProgramService: DegreeProgramService,
              private dialog: MatDialog) {
    this.formGroup = new FormGroup({
      fileUpload: new FormControl([])

    })

    this.degProgramFormGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      abbreviation: new FormControl('',[Validators.required]),
      current_class: new FormControl('',[Validators.required]),
      deadline_application: new FormControl('',[Validators.required]),
      internship_start: new FormControl('',[Validators.required]),
      internship_end: new FormControl('',[Validators.required]),
      deadline_report1: new FormControl('',[Validators.required]),
      deadline_report2: new FormControl('',[Validators.required]),
      deadline_report3: new FormControl('',[Validators.required])
    })
    this.reports = null
    this.initDate = new Date()
  }
  ngOnInit(): void {
    this.degreeProgramService.getDegreePrograms().subscribe(degree_programs => {
      this.degree_programs = degree_programs
      degree_programs.forEach(dp=>{
        if (dp.pk){
          for (let i = 1; i <= 3; i++) {
            this.fileService.checkReport(dp.pk!,i).subscribe(r=>{
              if (this.reports !== null){
                this.reports.push({report:i,dp_pk:dp.pk!,ok:r})
                console.log(this.reports)
              }else{
                this.reports = [{report:i,dp_pk:dp.pk!,ok:r}]
                console.log(this.reports)
              }
            })
          }
        }
      })
    })
  }

  reportIsUploaded(report: number, dp_pk:number):boolean{
    let result = false
    let okList = this.reports?.filter(r => r.report === report && r.dp_pk === dp_pk)
    if(okList != undefined && okList?.length > 0){
      result = okList[0].ok
    }
    return result
  }

  handleReportClick(dp_pk: number, report: number) {
    this.fileUploadConfig.data = {event: 'Report ' + dp_pk}
    this.dialogRef = this.dialog.open(DialogComponent, this.fileUploadConfig);
    this.dialogRef.componentInstance.degree_program = dp_pk
    this.dialogRef.componentInstance.report_no = report
  }

  cancel(){
    this.editId = 0;
    this.degreeProgramService.getDegreePrograms().subscribe(degree_programs => {
      this.degree_programs = degree_programs
    })
  }

  setEdit(userId: number){
    this.editId = userId;
    let toEdit = this.degree_programs.filter(p=>p.pk === userId)
    if(toEdit?.length === 1){
      this.degProgramFormGroup = new FormGroup({
        name: new FormControl(toEdit[0].name),
        abbreviation: new FormControl(toEdit[0].abbreviation),
        current_class: new FormControl(toEdit[0].current_class),
        deadline_application: new FormControl(toEdit[0].deadline_application),
        internship_start: new FormControl(toEdit[0].internship_start),
        internship_end: new FormControl(toEdit[0].internship_end),
        deadline_report1: new FormControl(toEdit[0].deadline_report1),
        deadline_report2: new FormControl(toEdit[0].deadline_report2),
        deadline_report3: new FormControl(toEdit[0].deadline_report3)
      })
    }
  }

  newDegPro(){
    let newDegPro:DegreeProgram = {
      pk: 0,
      name: '',
      abbreviation: '',
      current_class: '',
      deadline_application: this.initDate,
      internship_start: this.initDate,
      internship_end: this.initDate,
      deadline_report1: this.initDate,
      deadline_report2: this.initDate,
      deadline_report3: this.initDate,
      backgroundColor:""
    }
    this.degreeProgramService.getDegreePrograms().subscribe(degree_programs => {
      degree_programs.push(newDegPro)
      this.degree_programs = degree_programs
      console.log(this.degree_programs)
    })
      //this.degree_programs.push(newDegPro)

      this.editId = 0
    }



  createDegPro(){
    let toAdd:DegreeProgram = {
      pk: null,
      name: this.degProgramFormGroup.get('name')?.value,
      abbreviation: this.degProgramFormGroup.get('abbreviation')?.value,
      current_class: this.degProgramFormGroup.get('current_class')?.value,
      deadline_application: this.degProgramFormGroup.get('deadline_application')?.value,
      internship_start: this.degProgramFormGroup.get('internship_start')?.value,
      internship_end:this.degProgramFormGroup.get('internship_end')?.value,
      deadline_report1: this.degProgramFormGroup.get('deadline_report1')?.value,
      deadline_report2: this.degProgramFormGroup.get('deadline_report2')?.value,
      deadline_report3: this.degProgramFormGroup.get('deadline_report3')?.value,
      backgroundColor: "",
    }
    this.degreeProgramService.createDegreeProgram(toAdd).subscribe(e=>{
      this.editId = 0;
      this.http.get<DegreeProgram[]>(`${environment.apiBaseUrl}/degree-programmes/`).subscribe(degree_programs => {
        this.degree_programs = degree_programs
      })
    })

  }

  updateDegPro(userId: number){
    let toUpdate:DegreeProgram = {
      pk: userId,
      name: this.degProgramFormGroup.get('name')?.value,
      abbreviation: this.degProgramFormGroup.get('abbreviation')?.value,
      current_class: this.degProgramFormGroup.get('current_class')?.value,
      deadline_application: this.degProgramFormGroup.get('deadline_application')?.value,
      internship_start: this.degProgramFormGroup.get('internship_start')?.value,
      internship_end:this.degProgramFormGroup.get('internship_end')?.value,
      deadline_report1: this.degProgramFormGroup.get('deadline_report1')?.value,
      deadline_report2: this.degProgramFormGroup.get('deadline_report2')?.value,
      deadline_report3: this.degProgramFormGroup.get('deadline_report3')?.value,
      backgroundColor:""
    }
    this.degreeProgramService.updateDegreeProgram(toUpdate).subscribe(e=>{
      this.editId = 0;
      this.degreeProgramService.getDegreePrograms().subscribe(degree_programs => {
        this.degree_programs = degree_programs
      })
    })

  }
  deleteDegPro(userId: number){
    this.degreeProgramService.deleteDegreeProgram(userId).subscribe(e=>{
      this.editId = 0;
      this.degreeProgramService.getDegreePrograms().subscribe(degree_programs => {
        this.degree_programs = degree_programs
      })
    })

  }
  onChange(event: any) {
    /*
    this.file = event.target.files[0]
    console.log(this.file)
    if (this.student != null && this.file != undefined) {
      this.fileService.uploadFile(this.file, this.student).subscribe( response => {
        console.log(response)
      })
    }
     */
  }
}
