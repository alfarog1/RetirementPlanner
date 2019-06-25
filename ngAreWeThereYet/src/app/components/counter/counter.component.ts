import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  payments = this.assetSvc.monthlyRetirementIncome();
effect = "easeInOutBounce";

  duration = 2000;

  constructor(private assetSvc: AssetService) { }

  ngOnInit() {
  }






}
