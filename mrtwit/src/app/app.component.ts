import { Component } from '@angular/core';
import { UserService } from './services/userService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mrtwit';

  constructor(
    private userService:UserService
  ){


  }

  isSiggnedIn()
  {
    return this.userService.loggedInUser !=  null && this.userService.loggedInUser.authKey != undefined   && this.userService.loggedInUser.authKey != null &&  this.userService.loggedInUser.authKey.length > 0;
  }
}
