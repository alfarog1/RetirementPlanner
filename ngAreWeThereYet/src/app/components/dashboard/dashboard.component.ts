
import { UserService } from './../../services/user.service';
import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name;
  user: User;
  newAsset: Asset = null;
  assets: Asset[] = [];

  constructor(private assetService: AssetService, private usersvc: UserService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getUser();

  }

  addedAsset(newAsset: Asset) {
    this.assetService.create(newAsset);
    newAsset = null;
    this.assetService.getUsersAssets().subscribe(
      good => {
        // this.home.reload();
        newAsset = null;
      },
      bad => {
        console.log(bad);
      }
    );
  }

  getUser() {
    this.usersvc.getUser().subscribe(
      data => {
        this.user = data;
        this.name = this.user.userProfile.fName + ' ' + this.user.userProfile.lName;
      },
      err => {
        console.log('error getting user in dashboard:');
        console.log(err);
      }
    );
  }


  reloadDashboard() {

  }


}



