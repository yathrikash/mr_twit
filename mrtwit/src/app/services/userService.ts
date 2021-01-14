import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/user/UserProfile';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileInfo } from '../models/user/ProfileInfo';
import { MrUserInfo } from '../models/user/MrUserInfo';
import { SignIn } from '../models/user/signIn';
import { Session } from '../models/user/Session';

@Injectable({providedIn:'root'})
export  class UserService 
{

constructor (private http:HttpClient)
{
    console.log("inside ctor user service");

}
public loggedInUser = new Session();
 getUser(userId:string){
     console.log("inside get user");
var url = environment.mrtwit_api_base_url + 'user/' + userId;
var response =  this.http.get(url);

return response;
}


addUser(userInfo:UserProfile){
    console.log("inside add user");
var url = environment.mrtwit_api_base_url + 'user' ;
var response =  this.http.post(url,userInfo);
return response;
}

signIn(sighInInfo:SignIn)
{
    console.log("inside sign in ");
var url = environment.mrtwit_api_base_url + 'user/signin';
var response =  this.http.post(url,sighInInfo);
return response;
}


signOut(signOutInfo :SignIn)
{
    console.log("inside signout");
var url = environment.mrtwit_api_base_url + 'user/signout';
var response =  this.http.put(url,signOutInfo );
return response;
}

isValidUser(session:Session)
{
console.log("inside is valid user");
var url = environment.mrtwit_api_base_url + 'user/isvaliduser';
var response =  this.http.put(url,session );
return response;
}


}