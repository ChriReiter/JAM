import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  loginFormGroup: FormGroup;
  public showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
              private snackbar: MatSnackBar,public userService: UserService) {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.loginFormGroup.value)

   }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
