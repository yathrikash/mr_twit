export class Tweet
{
_id:string;
tweetId:string;
type:number;
content:string;
imageUrl:string;
replies:string[];
reply:string;
userId:string;
hashTags:string[];
likes:number;
}

export class TweetOld
{
_id:string;
tweetId:string;
type:number;
content:string;
imageUrl:string;
replies:string[];
userId:string;
hashTags:string[];
likes:number;
}