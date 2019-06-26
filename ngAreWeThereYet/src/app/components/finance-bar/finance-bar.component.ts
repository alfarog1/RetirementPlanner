import { UserProfile } from './../../models/user-profile';
import { CounterComponent } from './../counter/counter.component';
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

  fv = 0;
  balanceNeeded = 0;
  annualRateAtRetirement = 4;
  ror = 6;
  assets: Asset[] = [];
  yearsToRetire: number;
  ready = 0;
  user: User;
  percentOfIncome = 80;
  payments = 0;
  retireAge: number;

  constructor(private assetService: AssetService, private usersvc: UserService, private userProService: UserProfileService) { this.getUser(); }

  ngOnInit () {
    this.getUser();
  }

  getUser() {
    this.usersvc.getUser().subscribe(
      data => {
        this.user = data;
        this.user = data;
        console.log(this.user.userProfile.retirementAge);

        this.retireAge = this.user.userProfile.retirementAge;
        this.futureValueOfAssets();
        this.balanceNeededAtRetirement();
        this.monthlyRetirementIncome();
        this.retirementReadiness();
        this.yearsToRetire = this.user.userProfile.retirementAge - this.userProService.ageFromDateOfBirthday(this.user.userProfile.dob);

        console.log(this.retireAge);
        console.log(this.futureValueOfAssets());
        console.log(this.balanceNeededAtRetirement());
        console.log(this.monthlyRetirementIncome());
        console.log(this.retirementReadiness());
        console.log(this.fv);
      },
      err => {
        console.log('error retrieving user:');
        console.log(err);

      }
    );
  }


  futureValueOfAssets() {
    this.assetService.getUsersAssets().subscribe(
      good => {
        this.assets = good;
        console.log("A good thing happened");
        console.log(good);
        this.assets.forEach((asset) => {
          const i = 6 /asset.vehicle.compoundingPeriods;
          const t = asset.vehicle.compoundingPeriods * this.yearsToRetire;
          const d = asset.periodicDeposit;
          const x = 1 + i;
          console.log(i);
          console.log(t);
          console.log(d);
          console.log(x);
          this.fv += asset.amount *
               Math.pow( x, t) + d * ((Math.pow(x, t) - 1) / i) * x;
              });
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
console.log(i);
console.log(t);
console.log(d);
console.log(x);
this.fv += asset.amount *
     Math.pow( x, t) + d * ((Math.pow(x, t) - 1) / i) * x;
    });

    return this.fv;
  }

  balanceNeededAtRetirement(){
const regularWithdrawals = (this.user.userProfile.income *(this.user.userProfile.percentIncome/100))/12;
const numofCompPerYr= 12;


this.balanceNeeded = (regularWithdrawals * (1-(Math.pow((1 + this.annualRateAtRetirement/numofCompPerYr),
 -((this.yearsInRetirement()) * numofCompPerYr))))/(this.annualRateAtRetirement/numofCompPerYr));
return this.balanceNeeded;  }

yearsInRetirement() {
  const yir = this.user.userProfile.lifeExpectancy - this.user.userProfile.retirementAge;
  return yir;
}

  retirementReadiness() {
    this.futureValueOfAssets();
    this.balanceNeededAtRetirement();
    this.ready = this.fv/this.balanceNeeded;
    return this.ready;
  }

monthlyRetirementIncome() {
  this.payments =
   (this.futureValueOfAssets() * this.annualRateAtRetirement)/(Math.pow((1 + this.annualRateAtRetirement),this.yearsInRetirement()) - 1);
}
}
