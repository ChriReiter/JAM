import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, public userService: UserService) {
  }
  title = 'frontend';

  getUsername(): string {
    //console.log(this.userService.getUsername());
    return this.userService.getUsername();
  }

}
