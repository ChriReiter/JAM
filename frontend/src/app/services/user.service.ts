import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
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

    login(userData: { username: string, password: string }): void {
        this.http.post(`${environment.apiBaseUrl}/token/`, userData)
            .subscribe({
                next: (res: any) => {
                    this.isLoggedIn$.next(true);
                    localStorage.setItem('access_token', res.access);
                    this.router.navigate(['/company-list']);
                    this.snackbar.open('Successfully logged in', 'OK', {duration: 3000});
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

    getStudentByUsername(username: string) {
        return this.http.get<Student[]>(`${environment.apiBaseUrl}/students/?username=` + username)
    }

    //TODO: not functional yet, only for testing - adjust once group settings are added
    isLecturer(): boolean {
      if(this.hasPermission('jamapi.delete_company')){
        return true;
      }else{return false}
    }
    getGroupByToken(){
      const token = localStorage.getItem(this.accessTokenLocalStorageKey);
      const decodedToken = this.jwtHelperService.decodeToken(token ? token : '');
      const group = decodedToken?.groups;
      return group
    }


}
