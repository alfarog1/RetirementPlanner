import { UserProfile } from './../../models/user-profile';
import { AssetdisplayComponent } from './../assetdisplay/assetdisplay.component';
import { AssetService } from './../../services/asset.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Asset } from 'src/app/models/asset';
import { UserProfileService } from 'src/app/services/user-profile.service';


@Component({
  selector: 'app-retiregoals',
  templateUrl: './retiregoals.component.html',
  styleUrls: ['./retiregoals.component.css']
})
export class RetiregoalsComponent implements OnInit {
  edit = false;
  user: User;
  totalAssets;
  assets: Asset[];
  tempUserProfile: UserProfile;

  constructor(private usersvc: UserService, private assetsvc: AssetService, private profilesvc: UserProfileService) { }

  ngOnInit() {
    this.getUser();
    this.getAssets();

  }

  getUser() {
    this.usersvc.getUser().subscribe(
      data => {
        this.user = data;
      },
      err => {
        console.log('error retrieving user:');
        console.log(err);

      }
    );
  }

  startEdit() {
    this.edit = !this.edit;
    this.tempUserProfile = this.user.userProfile;
  }
  commitEdit() {
    this.profilesvc.update(this.tempUserProfile).subscribe(
      data => {
        this.tempUserProfile = null;
        this.edit = !this.edit;
      },
      err => {
        console.log('error commiting edit');
        console.log(err);
      }
    );
  }
  getAssets() {
    this.assetsvc.getUsersAssets().subscribe(
      data => {
        this.assets = data;
        this.sumAssets();
      },
      err => {
        console.log('error getting user assets in retiregoals:');
        console.log(err);
      }
    );
  }

  sumAssets() {
    let total = 0;
    this.assets.forEach(element => {
      total += element.amount;
    });
    this.totalAssets = total;
  }

  neededAssets() {
    let income = this.user.userProfile.income;
    let percent = this.user.userProfile.percentIncome / 100;
    let years = this.user.userProfile.retirementExpectancy - this.user.userProfile.retirementAge;

    return (income * percent) * years;
  }



}
