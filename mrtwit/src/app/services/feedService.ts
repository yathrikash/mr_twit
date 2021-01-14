import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/user/UserProfile';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileInfo } from '../models/user/ProfileInfo';

@Injectable({providedIn:'root'})
export  class FeedService 
{

constructor (private http:HttpClient)
{
    console.log("inside ctor feed");

}

getFeeds(userId:string){
console.log("inside get feeds");
var url = environment.mrtwit_api_base_url + 'feed/' + userId;
var response =  this.http.get(url);
return response;
}



}