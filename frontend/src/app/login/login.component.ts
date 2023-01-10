import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
              private snackbar: MatSnackBar) {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    this.http.post('http://localhost:8000/api/token/', this.loginFormGroup.value)
      .subscribe({
        next: (res: any) => {
          this.username = this.loginFormGroup.get('username')?.value;
          sessionStorage.setItem("username", this.username)
          localStorage.setItem('access_token', res.access);
          this.router.navigate(['internship-list']);
          this.snackbar.open('Welcome ' + this.username + "!", 'OK', {duration: 3000})
        },
        error: () => {
          this.snackbar.open('Invalid credentials', 'OK', {duration: 3000})
        }
      });
  }
}
