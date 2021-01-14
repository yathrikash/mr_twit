
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tweet } from 'src/app/models/Tweet/tweet';
import { ProfileInfo } from 'src/app/models/user/ProfileInfo';
import { ProfileService } from 'src/app/services/profileService';
import { TweetService } from 'src/app/services/tweetService';

@Component({
  selector: 'app-mainpage-component',
  templateUrl: './mainpage-component.html',
  styleUrls: ['./mainpage-component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private service: ProfileService,private twtService:TweetService) {
    this.mainForm = new FormGroup({});
  }

  ngOnInit(): void {
  }
data:ProfileInfo ;
tweets:Tweet[];
tweetValue:string;
showTweets:boolean = false;
@Input()
mainForm:FormGroup;
showContent : boolean = false;
  getData()
  {
    console.log("inside getdata");
     this.service.getProfile().subscribe(x=>{
this.data = x as ProfileInfo;

this.mainForm.addControl("profileId",new FormControl(this.data.profileId));
this.mainForm.addControl("name",new FormControl(this.data.name));
this.mainForm.addControl("gender",new FormControl(this.data.gender));
this.mainForm.addControl("profileImage",new FormControl(this.data.profileImage));
this.showContent = true;
this.tweetValue = "a0d5828e-06ee-43e9-b763-baff576ad53b";
this.mainForm.enable();
this.getTweets();
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

  getTweets()
  {
    console.log("inside get tweets");
    this.twtService.getTweetsOfUser("ba57c315-eb16-47c1-91ba-6bf08e394a36").subscribe(x=>{
    console.log("inside get tweets res: " , x);
this.tweets = x as Tweet[];

this.showTweets = true;
//this.tweetValue = "a0d5828e-06ee-43e9-b763-baff576ad53b";
this.mainForm.enable();
console.log(this.tweets);
console.log("data");
   });
 
  }

}
