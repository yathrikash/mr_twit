import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Tweet, TweetOld } from '../models/Tweet/tweet';
import { stringify } from '@angular/compiler/src/util';

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

addTweet(tweet:TweetOld){
    console.log("inside add tweet,", JSON.stringify(tweet));
var url = environment.mrtwit_api_base_url + 'tweet';
var response =  this.http.post(url,tweet);
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

var newTweet: TweetOld = new TweetOld();
newTweet.content= tweetInfo.content;

var response =  this.http.put(url,newTweet);
return response;
}


likeTweet(tweetId:string){
    console.log("inside like  ,",tweetId);
var url = environment.mrtwit_api_base_url + 'tweet/like/' + tweetId;
var response =  this.http.put(url,"");
return response;
}

}