import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Tweet } from 'src/app/models/Tweet/tweet';
import { TweetService } from 'src/app/services/tweetService';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

 
  constructor(private service: TweetService) {
    this.mainForm = new FormGroup({});
  }

  ngOnInit(): void {
  }
data:Tweet;

@Input()
mainForm:FormGroup;
showContent : boolean = false;
  getData()
  {
    console.log("inside getdata");
     this.service.getProfile().subscribe(x=>{
       console.log(x);
this.data = x as Tweet;

this.mainForm.addControl("userId",new FormControl(this.data.userId));
this.mainForm.addControl("content",new FormControl(this.data.content));
this.mainForm.addControl("image",new FormControl(this.data.imageUrl));
this.mainForm.addControl("likes",new FormControl(this.data.likes));
this.mainForm.addControl("replies",new FormControl(this.data.replies));
this.showContent = true;
this.mainForm.enable();
console.log(this.data);
console.log("data");
    });
  
  }

  showForm()
  {
    return this.showContent;
  }
  processData(event)
  {
    console.log(event.value);

  }

}
