import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newAsset: Asset = null;
  assets: Asset[] = [];
  constructor(private assetService: AssetService) { }

  ngOnInit() {
  }

  addedAsset(newAsset: Asset){
    this.assetService.create(newAsset);
    newAsset = null;
    this.assetService.getUsersAssets().subscribe(
      good => {
        this.assets = good;
      }
    )
  }


}
