import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Tweet } from 'src/app/models/Tweet/tweet';
import { TweetService } from 'src/app/services/tweetService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  constructor(private service: TweetService) {
    this.fb = new FormBuilder();
    this.mainForm = this.fb.group({
      tweetsArray :  this.fb.array([


      ])
    });
    
  }
  
  ngOnInit(): void {
    console.log("inside getdata tweetid init: " + this.tweetId);
    -console.log('length of tweets:',this.tweets.length);
    if(this.tweets.length > 0)
    {
      this.createTweetControl();
    }
    else
    this.getData();
  }
data:Tweet;
fb:FormBuilder;
formArrayInfo:FormArray;
mainForm:FormGroup;

@Input()
tweetId:string;
@Input()
tweets:Tweet[];


showContent : boolean = false;
  getData()
  {
    console.log("inside getdata tweetid: " + this.tweetId);
     this.service.getTweet(this.tweetId ?? 'a0d5828e-06ee-43e9-b763-baff576ad53b').subscribe(x=>{
       console.log(x);
this.data = x as Tweet;


this.showContent = true;
this.mainForm.enable();
console.log(this.data);
console.log("data");
    });
  
  }

  createTweetControl()
  {
      
    this.tweets.forEach(element => {
      var arr = <FormArray>this.mainForm.get("tweetsArray");
      arr.push(
        this.fb.group({
          tweetId:[element.tweetId],
          userId:[element.userId],
          content:[element.content],
          imageUrl:[element.imageUrl],
          likes:[element.likes],
          replies:[element.replies]
        }));
      this.showContent = true;
      console.log(this.mainForm.value); 
    });
this.formArrayInfo = <FormArray>this.mainForm.get("tweetsArray");
console.log(this.formArrayInfo);
  }

  showForm()
  {
    return this.showContent;
  }
  processData(event)
  {
    console.log("tweet:",event);
  }

}
