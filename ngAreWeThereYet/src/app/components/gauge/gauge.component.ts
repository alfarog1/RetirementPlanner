import { FinanceBarComponent } from './../finance-bar/finance-bar.component';
import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {

  constructor(private assetSvc: AssetService) { }

  ngOnInit() {
  }

  gaugeType = "semi";
  retirementReadiness = this.assetSvc.retirementReadiness; // <----
  gaugeLabel = "Retirement Readiness";
  animate = true;
  thickness = 15;
  // gaugeAppendText = "km/hr";

  thresholdConfig = {
    '0': {color: 'red'},
    '40': {color: 'orange'},
    '75.5': {color: 'green'}
};
}
