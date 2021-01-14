import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Tweet } from '../models/Tweet/tweet';

@Injectable({providedIn:'root'})
export  class TweetService 
{

constructor (private http:HttpClient)
{
}

 getTweetsOfUser(userId){
     console.log("inside getTweetsOfUser,",userId);
var url = environment.mrtwit_api_base_url + 'tweet/user/' + userId;
var response =  this.http.get(url);
return response;
}

getTweetByTweetIds(tweetIds:string[]){
    console.log("inside getTweetsByTweetIds,");
var url = environment.mrtwit_api_base_url + 'tweet/tweets';

var response =  this.http.put(url,tweetIds);
return response;
}

getTweet(tweetId){
    console.log("inside getTweet ,",tweetId);
var url = environment.mrtwit_api_base_url + 'tweet/' + tweetId;
var response =  this.http.get(url);
return response;
}




replyTweet(tweetId:string,tweetInfo : Tweet){
    console.log("inside reply ,",tweetId);

var url = environment.mrtwit_api_base_url + 'tweet/reply/' + tweetId;
var response =  this.http.put(url,tweetInfo);
return response;
}


likeTweet(tweetId:string){
    console.log("inside like  ,",tweetId);

var url = environment.mrtwit_api_base_url + 'tweet/like/' + tweetId;
var response =  this.http.put(url,"");
return response;
}

}