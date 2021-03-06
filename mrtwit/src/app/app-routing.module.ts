import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpageComponent } from './Components/mainpage-component/mainpage-component';
import { SigninandupComponent } from './Components/signinandup/signinandup.component';
import { TweetComponent } from './Components/tweet/tweet.component';

const routes: Routes = [

{path:'mainpage',component:MainpageComponent},
{path:'tweetpage',component:TweetComponent},
{path:'signin',component:SigninandupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
