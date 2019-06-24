import { HomeComponent } from './../home/home.component';
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
  constructor(private assetService: AssetService, private home: HomeComponent) { }

  ngOnInit() {
    this.assetService.getUsersAssets().subscribe(
      good =>{
        this.assets = good;
      },
      bad =>{
        console.log(bad);
      }
    )
  }

  addedAsset(newAsset: Asset) {
    this.assetService.create(newAsset).subscribe(
      good => {
        this.home.reload()
        newAsset = null;
      },
      bad => {
        console.log(bad);
      }
    )
  }
}



