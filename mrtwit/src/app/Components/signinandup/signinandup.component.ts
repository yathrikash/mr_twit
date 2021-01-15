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
  errorMessage :string ="";
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
 this.mainForm.addControl("userName",new FormControl(''));
 this.mainForm.addControl("password",new FormControl(''));
this.mainForm.addControl("suname",new FormControl(''));
this.mainForm.addControl("suuserName",new FormControl(''));
this.mainForm.addControl("supassword",new FormControl(''));
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
    this.userName = this.mainForm.get('userName').value;
    this.password = this.mainForm.get('password').value;
    
    var info = new SignIn();
    info.userName = this.userName;
    info.password = this.password;
    info.device = "Chrome_windows";
    console.log(info);
    this.userServ.signIn(info).subscribe(x=>{
      console.log('session',x);
 this.userServ.loggedInUser = x as Session;
 if(this.userServ.loggedInUser.authKey == "" || this.userServ.loggedInUser.authKey == null ||
 this.userServ.loggedInUser.authKey  == undefined )
 {
  this.errorMessage = "Invalid username or password.";

 }
 else
 this.route.navigate(['/mainpage']);
    });
    
  }
  
  processSignUp()
  {
    
    this.userName = this.mainForm.get('suuserName').value;
    this.password = this.mainForm.get('supassword').value;
    this.name  = this.mainForm.get('suname').value;



    this.userProfileInfo.userInfo.userName = this.userName;
    this.userProfileInfo.userInfo.hashedPassword= this.password;
    this.userProfileInfo.profileInfo.name= this.name;
    this.userProfileInfo.profileInfo.gender= 0;
    console.log(this.userProfileInfo);
    this.userServ.addUser(this.userProfileInfo).subscribe();

    this.mainForm.get('userName').setValue(this.userName);
     this.mainForm.get('password').setValue(this.password);

    this.processSignIn();
    this.route.navigate(['/mainpage']);
  }
  
  showForm()
  {
    return this.showFormContent;
  }
}
