import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {


  constructor(private assetSvc: AssetService) { }

  ngOnInit() {
  }
  payments = this.assetSvc.monthlyRetirementIncome();


}
