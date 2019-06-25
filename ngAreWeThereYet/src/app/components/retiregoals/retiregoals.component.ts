import { UserProfile } from './../../models/user-profile';
import { AssetdisplayComponent } from './../assetdisplay/assetdisplay.component';
import { AssetService } from './../../services/asset.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Asset } from 'src/app/models/asset';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private usersvc: UserService, private assetsvc: AssetService,
              private profilesvc: UserProfileService, private modalService: NgbModal) { }

  getUser() {
    this.usersvc.getUser().subscribe(
      data => {
        console.log("**************");
        this.user = data;
        console.log(data);
        console.log(this.user);

      },
      err => {
        console.log('error retrieving user:');
        console.log(err);

      }
    );
  }

  getUserProfile() {

  }

  startEdit() {
    this.tempUserProfile = Object.assign({}, this.user.userProfile);
  }
  commitEdit() {
    console.log(this.tempUserProfile);
    // this.tempUserProfile.id = this.user.userProfile.id;
    // this.tempUserProfile.user = this.user;
    this.user.userProfile = this.tempUserProfile;
    console.log(this.tempUserProfile);
    if (this.tempUserProfile.payPeriod == null) {
      this.tempUserProfile.payPeriod = this.user.userProfile.payPeriod;
    }
    if (this.tempUserProfile.dob == null) {
      this.tempUserProfile.dob = this.user.userProfile.dob;
    }
    console.log(this.user);

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
    let years = this.user.userProfile.lifeExpectancy - this.user.userProfile.retirementAge;

    return (income * percent) * years;
  }

  ngOnInit() {
    this.getUser();
    console.log(this.user);
    this.getAssets();
  }

  openSm(content) {
    this.modalService.open(content, { size: "lg" });
  }

  // reload() {
  //   this.usersvc.index().subscribe(
  //     good => {
  //       this.assets = good;
  //       this.averageBalancePerAsset();
  //       console.log(this.assets);
  //     },
  //     bad => {
  //       console.log(bad);
  //     }
  //   )
  // }

}
