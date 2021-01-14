import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/user/UserProfile';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileInfo } from '../models/user/ProfileInfo';

@Injectable({providedIn:'root'})
export  class ProfileService 
{

constructor (private http:HttpClient)
{
    console.log("inside ctor profile");

}

 getProfile(){
     console.log("inside get profile");
var url = environment.mrtwit_api_base_url + 'profile/ba57c315-eb16-47c1-91ba-6bf08e394a36'
var response =  this.http.get(url);
return response;
}


getProfileById(userId:string){
    console.log("inside get profile by id");
var url = environment.mrtwit_api_base_url + 'profile/' + userId;
var response =  this.http.get(url);
return response;
}

getFollowers(userId:string)
{
    console.log("inside get followers");
var url = environment.mrtwit_api_base_url + 'profile/' + userId + '/followers';
var response =  this.http.get(url);
return response;
}


getFollowings(userId:string)
{
    console.log("inside get followings");
var url = environment.mrtwit_api_base_url + 'profile/' + userId + '/followings';
var response =  this.http.get(url);
return response;
}

addFollowing(userId:string, followingId:string)
{
    console.log("inside add following ");
    var url = environment.mrtwit_api_base_url + 'profile/' + userId + '/addfollowing/' + followingId;
    var response =  this.http.put(url,"");
    return response;
}

}