import { Router, Route } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
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
  neededAssetsVar = 0;
  balanceNeeded = 0;
  annualRateAtRetirement = 4;

  constructor(private usersvc: UserService, private assetsvc: AssetService,
              private profilesvc: UserProfileService, private modalService: NgbModal,
              private auth: AuthenticationService, private router: Router) { }

  getUser() {
    this.usersvc.getUser().subscribe(
      data => {
        this.user = data;


        const p = (this.user.userProfile.income / 12) * (this.user.userProfile.percentIncome / 100);
        const n = 12 * (this.user.userProfile.lifeExpectancy -
              this.user.userProfile.retirementAge);
        const i = .04 / 12;
        this.balanceNeeded = p * ((Math.pow(1 + i, n) - 1) / i);
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
    this.tempUserProfile.id = this.user.userProfile.id;
    this.tempUserProfile.user = this.user;
    // this.user.userProfile = this.tempUserProfile;
    if (this.tempUserProfile.payPeriod == null) {
      this.tempUserProfile.payPeriod = this.user.userProfile.payPeriod;
    }
    if (this.tempUserProfile.dob == null) {
      this.tempUserProfile.dob = this.user.userProfile.dob;
    }
    this.profilesvc.update(this.tempUserProfile).subscribe(
      data => {
        this.tempUserProfile = null;
        this.edit = !this.edit;
        this.ngOnInit();
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
    // let income = this.user.userProfile.income;
    // let percent = this.user.userProfile.percentIncome / 100;
    // let years = this.user.userProfile.lifeExpectancy - this.user.userProfile.retirementAge;
    // let interest = .04;
    // let monthlyCompund = 12;
    // return (income * percent) * years;
    // return (income * percent) * (1 - (1 + Math.pow((interest / monthlyCompund), -(years * monthlyCompund)))) / (interest / 12);
    // return this.finBar.balanceNeeded;

  }

  ngOnInit() {
    this.getUser();
    this.getAssets();
  }

  openSm(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  logout() {
    this.auth.logout();
  }
  deactivate() {
    if (confirm()) {
      this.user.enabled = false;
      this.usersvc.update(this.user).subscribe(
        good => {
          this.router.navigateByUrl('home');
        }
      );
    }
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
