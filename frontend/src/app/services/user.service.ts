import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";


export interface User {
  pk: number;
  username: string;
}

export interface Student {
  pk: number;
  matriculation_no: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  degree_program: number;
}

export interface Lecturer {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  degree_program: number[];
}

interface Group {
  name: string;
  url: string;
}

interface UserAPI {
  id: number;
  username: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly accessTokenLocalStorageKey = 'access_token';
  isLoggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService,
              private snackbar: MatSnackBar) {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    if (token) {
      console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
      const tokenValid = !this.jwtHelperService.isTokenExpired(token);
      this.isLoggedIn$.next(tokenValid);
    }
  }

  //TODO: add distinction between user/lecturer to route to correct dashboard (only student for now)
  login(userData: { username: string, password: string }): void {
    this.http.post(`${environment.apiBaseUrl}/token/`, userData)
      .subscribe({
        next: (res: any) => {
          this.isLoggedIn$.next(true);
          localStorage.setItem('access_token', res.access);
          this.router.navigate(['/student-dashboard']);
          this.snackbar.open('Successfully logged in', 'OK', {duration: 3000});
          sessionStorage.setItem('username', userData.username);
        },
        error: () => {
          this.snackbar.open('Invalid credentials', 'OK', {duration: 3000});
        }
      });

  }

  logout(): void {
    localStorage.removeItem(this.accessTokenLocalStorageKey);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/company-list']);
    this.snackbar.open('Successfully logged out', 'OK', {duration: 3000});
    sessionStorage.clear();
  }

  hasPermission(permission: string): boolean {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    const permissions = decodedToken?.permissions;
    return permissions ? permission in permissions : false;
  }

  getUsername(): string {
    let username = sessionStorage.getItem("username")
    if (username != null) {
      return username
    } else {
      return ""
    }
  }

  //TODO: you have to be superuser to get id. find other solution?
  getStudentId(username: string): number {
    let students = this.http.get<UserAPI[]>(`${environment.apiBaseUrl}/users/`)
    console.log(JSON.stringify(students))
    return 2
  }

  //TODO: correct user has to be looked for by ID (see method above)
  isLecturer(username: string): Observable<boolean> {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/users/${this.getStudentId(username)}/groups`)
      .pipe(
        map((groups: { name: string; }[]) => {
          console.log(groups[0].name)
          return (groups[0].name === 'Lecturer');
        })
      );
  }

  getGroupByToken() {
    const token = localStorage.getItem(this.accessTokenLocalStorageKey);
    const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
    return decodedToken?.groups
  }

}
