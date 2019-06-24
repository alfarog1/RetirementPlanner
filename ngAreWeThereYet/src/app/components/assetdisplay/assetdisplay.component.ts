import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';

@Component({
  selector: 'app-assetdisplay',
  templateUrl: './assetdisplay.component.html',
  styleUrls: ['./assetdisplay.component.css']
})
export class AssetdisplayComponent implements OnInit {

  assets: Asset[] = [];
  expand = 0;

  constructor(private assetsvc: AssetService) { }

  ngOnInit() {
    this.assetsvc.getUsersAssets().subscribe(
      data => {
        this.assets = data;
      },
      err => {
        console.log('error getting user assets:' + err);
      }
    );
  }

}
