import { Component } from '@angular/core';
import { Session } from './models/user/Session';
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
  signout()
  {

    this.userService.loggedInUser = new Session();
    
  }
  isSiggnedIn()
  {
    return this.userService.loggedInUser !=  null && this.userService.loggedInUser.authKey != undefined   && this.userService.loggedInUser.authKey != null &&  this.userService.loggedInUser.authKey.length > 0;
  }
}
