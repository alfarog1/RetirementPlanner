import { UserService } from 'src/app/services/user.service';
import { FinanceBarComponent } from './../finance-bar/finance-bar.component';
import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { User } from 'src/app/models/user';
import { Asset } from 'src/app/models/asset';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  
effect = "easeInOutBounce";


  duration = 2000;

  fv = 0;
  balanceNeeded = 0;
  annualRateAtRetirement = 4;
  ror = 6;
  assets: Asset[] = [];
  yearsToRetire: number;
  ready = 0;
  percentOfIncome = 80;
  payments = 0;
  rPayments = this.monthlyRetirementIncome();
  user: User;


  constructor(private assetSvc: AssetService, private usersvc: UserService) { }

  ngOnInit() {
    console.log('**********************');

    this.getUser();
  }

  getUser() {
    this.usersvc.getUser().subscribe(
      data => {
        console.log(data);
        this.user = data;

      },
      err => {
        console.log('error retrieving user:');
        console.log(err);

      }
    );
  }

  monthlyRetirementIncome() {
    this.payments =
     (this.futureValueOfAssets() * this.annualRateAtRetirement)/(Math.pow((1 + this.annualRateAtRetirement),this.yearsInRetirement()) - 1);
  }

  futureValueOfAssets() {
    this.assetSvc.getUsersAssets().subscribe(
      good => {
        this.assets = good;
        console.log("A good thing happened");
        console.log(good);
      },
      bad => {
        console.log("A bad thing happened");
        console.log(bad);
      },
      () => {}
    );
    this.assets.forEach(function(asset) {
const i = this.ror /asset.vehicle.compoundingPeriods;
const t = asset.vehicle.compoundingPeriods * this.yearsToRetire;
const d = asset.periodicDeposit;
const x = 1 + i;
this.fv += asset.amount *
     Math.pow( x, t) + d * ((Math.pow(x, t) - 1) / i) * x;
    });

    return this.fv;
  }

  balanceNeededAtRetirement(){
const regularWithdrawals = (this.usersvc.user.userProfile.income *(this.usersvc.user.userProfile.percentIncome/100))/12;
const numofCompPerYr= 12;


this.balanceNeeded = (regularWithdrawals * (1-(Math.pow((1 + this.annualRateAtRetirement/numofCompPerYr),
 -((this.yearsInRetirement()) * numofCompPerYr))))/(this.annualRateAtRetirement/numofCompPerYr));
return this.balanceNeeded;  }

yearsInRetirement() {
  // const yir = this.usersvc.user.userProfile.lifeExpectancy - this.usersvc.user.userProfile.retirementAge;
  return 1;
}

  retirementReadiness() {
    this.futureValueOfAssets();
    this.balanceNeededAtRetirement();
    this.ready = this.fv/this.balanceNeeded;
    return this.ready;
  }

}
