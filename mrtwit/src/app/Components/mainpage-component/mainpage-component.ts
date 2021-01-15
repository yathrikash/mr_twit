
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, timer } from 'rxjs';
import { Tweet } from 'src/app/models/Tweet/tweet';
import { ProfileInfo } from 'src/app/models/user/ProfileInfo';
import { Session } from 'src/app/models/user/Session';
import { ProfileService } from 'src/app/services/profileService';
import { TweetService } from 'src/app/services/tweetService';
import { UserService } from 'src/app/services/userService';

import { switchMap } from 'rxjs/operators';
import { FeedService } from 'src/app/services/feedService';
import { Feed } from 'src/app/models/Tweet/Feed';
@Component({
  selector: 'app-mainpage-component',
  templateUrl: './mainpage-component.html',
  styleUrls: ['./mainpage-component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private service: ProfileService,private twtService:TweetService,private uesrService:UserService,private feedService:FeedService) {
    this.mainForm = new FormGroup({});
  }

  ngOnInit(): void {
    // this.uesrService.loggedInUser = new  Session();
    // this.uesrService.loggedInUser.userId="prakash"; 
    console.log(JSON.stringify(this.uesrService.loggedInUser));
    this.loadData();


    this.subscription = timer(0, 30000).pipe(
      switchMap(() => this.feedService.getFeeds(this.uesrService.loggedInUser.userId))
    ).subscribe(result =>{
      
      var feeds = result as Feed;
      var list : string[] = [];
      feeds.orderedFeeds.forEach(element => {
        list.push(element.tweetId);
      });
      this.twtService.getTweetByTweetIds(list).subscribe(y=>{
            if(y != null && y != undefined)
        this.tweets = y as Tweet[];
        else
        console.log("feeds invalid,",y );
      });
    console.log(feeds);
    
    
    
    });


  }
data:ProfileInfo ;
currentUser:string;
tweets:Tweet[];
tweetValue:string;
showTweets:boolean = false;
@Input()
mainForm:FormGroup;
showContent : boolean = false;


loadData()
  {
    this.currentUser = this.uesrService.loggedInUser.userId;
    console.log("inside getdata");
   
    

     this.service.getProfile().subscribe(x=>{
       console.log('x',x);
       if(x == null || x == undefined)
       {    
       console.log("User profile not found.");
       return;
       }

this.data = x as ProfileInfo;
this.mainForm.addControl("profileId",new FormControl(this.data.profileId));
this.mainForm.addControl("name",new FormControl(this.data.name));
this.mainForm.addControl("gender",new FormControl(this.data.gender));
if(this.data.profileImage == null || this.data.profileImage == undefined || this.data.profileImage == "")
this.data.profileImage = "defaultuser.jpg";
this.mainForm.addControl("profileImage",new FormControl(this.data.profileImage));

this.loadUsers();
this.getFeeds();

//this.getTweets(this.uesrService.loggedInUser.userId);
console.log(this.data);
console.log("data");
    });
  
  }

  showForm()
  {
    return this.showContent;
  }

  showTweetsContent()
  {
    return this.showTweets;
  }
  processData(event)
  {
    console.log(event.value);

  }

  getFeeds()
  {
    this.feedService.getFeeds(this.uesrService.loggedInUser.userId).subscribe(x=>
      {

        
      var feeds = x as Feed;
      var list : string[] = [];
      feeds.orderedFeeds.forEach(element => {
        list.push(element.tweetId);
      });
      this.twtService.getTweetByTweetIds(list).subscribe(y=>{
        console.log("feeds ,",y );

         if(y != null && y != undefined)
         {
        this.tweets  = y as Tweet[];
        console.log('new tweets:',this.tweets);
         }
        else
        console.log("feeds invalid,",y );

        this.showContent = true;
        this.mainForm.enable();
        this.showTweets = true;
      });
    console.log(feeds);
    
    
      });
  }
  getTweets(userId:string)
  {
    this.showTweets =false;
    console.log("inside get tweets");
    this.twtService.getTweetsOfUser(userId).subscribe(x=>{
    console.log("inside get tweets res: " , x);
this.tweets = x as Tweet[];
this.tweets.forEach(x=>x.reply = "");

this.showTweets = true;

this.mainForm.enable();
console.log(this.tweets);
console.log("data");
   });
 
  }

  subscription: Subscription;

  showUsersInfo()
  {
    return this.showUsers;
  }
  
  availableUsers:string[];
  showUsers:boolean = false;
  loadUsers()
  {
    console.log('load users');
    this.uesrService.getUser("").subscribe(x=>{
      console.log('loaded: ',x);
this.availableUsers = x as string[];
console.log('loaded: ',this.availableUsers);
this.showUsers = true;
    })
  }
  addFollowing(user)
  {
    console.log('add foll',user,this.currentUser);
    this.service.addFollowing(this.currentUser,user).subscribe();
  }
}
