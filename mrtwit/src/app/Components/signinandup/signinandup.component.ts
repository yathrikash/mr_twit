import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Router} from '@angular/router'; 
import { MrUserInfo } from 'src/app/models/user/MrUserInfo';
import { ProfileInfo } from 'src/app/models/user/ProfileInfo';
import { Session } from 'src/app/models/user/Session';
import { SignIn } from 'src/app/models/user/signIn';

import { UserProfile } from 'src/app/models/user/UserProfile';
import { UserService } from 'src/app/services/userService';
@Component({
  selector: 'app-signinandup',
  templateUrl: './signinandup.component.html',
  styleUrls: ['./signinandup.component.scss']
})
export class SigninandupComponent implements OnInit {

  constructor(private route:Router,private userServ : UserService,private fb:FormBuilder) { 
this.fb = new FormBuilder();

  }

  userName:string;
  password:string;
  name:string;
  gender:number;

  ngOnInit(): void {


this.userProfileInfo = new UserProfile();
this.userProfileInfo.profileInfo = new ProfileInfo();
this.userProfileInfo.userInfo = new MrUserInfo();

this.mainForm = this.fb.group({
userName:[this.userName],
password:[this.password],
name:[this.name],
gender:[this.gender],
});
// this.mainForm.addControl("userName",new FormControl(''));
// this.mainForm.addControl("hashedPassword",new FormControl(''));
// this.mainForm.addControl("name",new FormControl(''));
// this.mainForm.addControl("gender",new FormControl(''));
// this.mainForm.addControl("password",new FormControl(''));
this.showFormContent = true;
  }
mainForm:FormGroup;
  userProfileInfo:UserProfile;
showFormContent:boolean;
  isSignUp:boolean = false;
  showSignIn(val:boolean)
  {
this.isSignUp = val;
  }
  isSignUpActive()
  {
    return this.isSignUp;
  }

  processSignIn()
  {
    console.log(this.userProfileInfo);
    var info = new SignIn();
    info.userName = this.userName;
    info.password = this.password;
    info.device = "Chrome_windows";

    this.userServ.signIn(info).subscribe(x=>{
 this.userServ.loggedInUser = x as Session;
    });
    
    this.route.navigate(['/mainpage']);
  }
  
  processSignUp()
  {
    
    this.userProfileInfo.userInfo.userName = this.userName;
    this.userProfileInfo.userInfo.hashedPassword= this.password;
    this.userProfileInfo.profileInfo.name= this.name;
    this.userProfileInfo.profileInfo.gender= this.gender;
    console.log(this.userProfileInfo);
    this.userServ.addUser(this.userProfileInfo);
    this.processSignIn();
    this.route.navigate(['/mainpage']);
  }
  
  showForm()
  {
    return this.showFormContent;
  }
}
