import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';
import { RiskProfileService } from 'src/app/services/risk-profile.service';
import { RiskProfile } from 'src/app/models/risk-profile';

@Component({
  selector: 'app-assetdisplay',
  templateUrl: './assetdisplay.component.html',
  styleUrls: ['./assetdisplay.component.css']
})
export class AssetdisplayComponent implements OnInit {

  risks: RiskProfile[] = [];
  editAsset: Asset = null;
  assets: Asset[] = [];
  tempAsset: Asset;
  expand = 0;

  constructor(private assetsvc: AssetService, private risksvc: RiskProfileService) { }

  ngOnInit() {
    this.getRisks();
    this.loadAssets();
  }

  loadAssets() {
    this.assetsvc.getUsersAssets().subscribe(
      data => {
        this.assets = data;
      },
      err => {
        console.log('error getting user assets:' + err);
      }
    );
  }
  deleteAsset() {
    this.assetsvc.destroy(this.editAsset.id).subscribe(
      data => {
        this.loadAssets();
        this.editAsset = null;
      },
      err => {
        console.log('error deleting asset:');
        console.log(err);
      }
    );
  }
  getRisks() {
    this.risksvc.getAll().subscribe(
      data => {
          this.risks = data;
      },
      err => {
        console.log('error getting risk profiles:');
        console.log(err);
      }
    );
  }
  commitEditAsset() {
    this.assetsvc.update(this.editAsset).subscribe(
      data => {
        this.loadAssets();
        this.editAsset = null;
      },
      err => {
        console.log('error updating asset:');
        console.log(err);
      }
    );
  }

}
