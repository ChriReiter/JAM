import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router, public userService: UserService) {
  }


  title = 'frontend';

  getUsername(): string {
    return this.userService.getUsername();
  }

}
