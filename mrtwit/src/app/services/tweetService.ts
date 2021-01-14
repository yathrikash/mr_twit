import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/user/UserProfile';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileInfo } from '../models/user/ProfileInfo';

@Injectable({providedIn:'root'})
export  class TweetService 
{

constructor (private http:HttpClient)
{
    console.log("inside ctor profile");

}

 getProfile(){
     console.log("inside get profile");
var url = environment.mrtwit_api_base_url + 'tweet/3a6b301d-f14c-418c-b307-632a35656582'
var response =  this.http.get(url);
return response;
}


}