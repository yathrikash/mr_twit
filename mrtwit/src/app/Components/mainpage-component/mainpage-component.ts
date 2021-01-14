import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileInfo } from 'src/app/models/user/ProfileInfo';
import { ProfileService } from 'src/app/services/profileService';

@Component({
  selector: 'app-mainpage-component',
  templateUrl: './mainpage-component.html',
  styleUrls: ['./mainpage-component.scss']
})
export class MainpageComponent implements OnInit {

  constructor(private service: ProfileService) {
    this.mainForm = new FormGroup({});
  }

  ngOnInit(): void {
  }
data:ProfileInfo ;

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
