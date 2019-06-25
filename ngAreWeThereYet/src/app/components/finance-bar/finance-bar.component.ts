import { UserProfileService } from 'src/app/services/user-profile.service';
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { UserService } from 'src/app/services/user.service';
import { Asset } from 'src/app/models/asset';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-finance-bar',
  templateUrl: './finance-bar.component.html',
  styleUrls: ['./finance-bar.component.css']
})
export class FinanceBarComponent implements OnInit {

  constructor(private assetService: AssetService) { }

  ngOnInit() {
  }


}
