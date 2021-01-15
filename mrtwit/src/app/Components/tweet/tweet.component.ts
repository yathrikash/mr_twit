import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Tweet, TweetOld } from 'src/app/models/Tweet/tweet';
import { ProfileService } from 'src/app/services/profileService';
import { TweetService } from 'src/app/services/tweetService';
import { UserService } from 'src/app/services/userService';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  @Output()
  onNewTweet: EventEmitter<any> = new EventEmitter();

  @Output()
  onUserClicked: EventEmitter<any> = new EventEmitter();

  data: Tweet;
  fb: FormBuilder;
  formArrayInfo: FormArray;
  mainForm: FormGroup;

  @Input()
  tweetId: string;
  @Input()
  tweets: Tweet[];
  showContent: boolean = false;

  fileToUpload: File;
  fileSelected: string;

  constructor(private service: TweetService, private userService: UserService) {
    this.fb = new FormBuilder();
    this.mainForm = this.fb.group({
      tweetsArray: this.fb.array([


      ])
    });
    this.onNewTweet = new EventEmitter();
    this.onUserClicked = new EventEmitter();
  }

  ngOnInit(): void {
    console.log("inside getdata tweetid init: " + this.tweetId);
    console.log('length of tweets:', this.tweets.length);
    if (this.tweets.length > 0) {
      this.createTweetControl();
    }
    else
      this.getData();
  }

  getData() {
    console.log("inside getdata tweetid: " + this.tweetId);
    this.service.getTweet(this.tweetId ?? 'a0d5828e-06ee-43e9-b763-baff576ad53b').subscribe(x => {
      console.log(x);
      this.data = x as Tweet;


      this.showContent = true;
      this.mainForm.enable();
      console.log(this.data);
      console.log("data");
    });

  }

  createTweetControl() {
    this.tweets.forEach(element => {
      var arr = <FormArray>this.mainForm.get("tweetsArray");


      arr.push(
        this.fb.group({
          reply: [element.reply]
        }));
      this.showContent = true;
    });


    console.log(this.formArrayInfo);
  }

  showForm() {
    return this.showContent;
  }
  processData(event) {

    console.log("tweet:", event);
  }
  likeTweet(v: Tweet) {
    v.likes += 1;
    this.service.likeTweet(v.tweetId).subscribe();
  }

  replyTweet(v: Tweet, replyControl) {

    var arr = <FormArray>(this.mainForm.get("tweetsArray"));
    var reply = new Tweet();
    reply.content = replyControl.value;
    reply.userId = this.userService.loggedInUser.userId;

    if (v.replies == null || v.reply == undefined)
      v.replies = [];

    v.replies.push(reply.content);
    this.service.replyTweet(v.tweetId, reply).subscribe();
    replyControl.value = "";

  }

  postTweet(tweetContent, tweetImageUrl) {
    var t = new TweetOld();
    t.content = tweetContent.value;
    t.imageUrl = tweetImageUrl.value;
    t.userId = this.userService.loggedInUser.userId;
    console.log(JSON.stringify(t));
    this.service.addTweet(t).subscribe(x => {
      this.onNewTweet.emit("loadFeeds");

    });

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.fileSelected = this.fileToUpload.name;
  }

  userClicket(userId) {
    this.onUserClicked.emit(userId);
  }

}