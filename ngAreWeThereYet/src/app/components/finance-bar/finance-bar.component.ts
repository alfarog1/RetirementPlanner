import { UserProfile } from './../../models/user-profile';
import { CounterComponent } from './../counter/counter.component';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Vehicle } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { UserService } from 'src/app/services/user.service';
import { Asset } from 'src/app/models/asset';
import { User } from 'src/app/models/user';
import { GaugeComponent } from '../gauge/gauge.component';


@Component({
  selector: 'app-finance-bar',
  templateUrl: './finance-bar.component.html',
  styleUrls: ['./finance-bar.component.css']
})
export class FinanceBarComponent implements OnInit {
  // From Guage
  gaugeType = 'semi';
  // retirementReadiness = (this.finbar.ready * 100); // <----
  retirementReadinessVar = 0;
  gaugeLabel = 'Retirement Readiness';
  animate = true;
  thickness = 15;
  // gaugeAppendText = "km/hr";

  thresholdConfig = {
    0: { color: 'red' },
    40: { color: 'orange' },
    75.5: { color: 'green' }
  };


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

  constructor(
    private assetService: AssetService,
    private usersvc: UserService,
    private userProService: UserProfileService
  ) {
    this.getUser();
  }

  ngOnInit() {
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
        this.yearsToRetire =
          this.user.userProfile.retirementAge -
          this.userProService.ageFromDateOfBirthday(this.user.userProfile.dob);

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
    console.log('Begin futureValueOfAssets()');
    this.assetService.getUsersAssets().subscribe(
      good => {
        console.log('>>> futureValueOfAssets() just received data.');
        this.assets = good;
        console.log('A good thing happened');
        console.log(good);
        console.log(this.assets);

        this.assets.forEach(asset => {
          if (asset.periodicDeposit !== 0) {
            const i = this.ror / 100 / asset.vehicle.compoundingPeriods;
            const t = asset.vehicle.compoundingPeriods * this.yearsToRetire;
            const contribution =
              asset.contributionFixed !== null
                ? asset.contributionFixed
                : (asset.contributionPercent / 100) * this.user.userProfile.income;
            console.log('contribution: ' + contribution);
            console.log('Con Fix: ' + asset.contributionFixed);
            console.log('Con %: ' + asset.contributionPercent);
            console.log('Income: ' + this.user.userProfile.income);

            const d = asset.periodicDeposit * contribution;
            const x = 1 + i;
            console.log('____________________________________');
            console.log(i);
            console.log(t);
            console.log(d);
            console.log(x);
            console.log(this.ror);

            const amountToAdd =
              asset.amount * Math.pow(x, t) +
              d * ((Math.pow(x, t) - 1) / i) * x;
            console.log(amountToAdd);
            this.fv += amountToAdd;
              // asset.amount * Math.pow(x, t) +
              // d * ((Math.pow(x, t) - 1) / i) * x;
            console.log('fv: ' + this.fv);
            console.log('____________________________________');
          } else {
            console.log('*****************************');
            console.log(this.ror + 'Else');
            const amountToAdd2 =  asset.amount * Math.pow(1 + this.ror / 100, this.yearsToRetire);
            this.fv += amountToAdd2;
            console.log('FV: ' + this.fv);
            console.log('*****************************');
          }
        });
        this.ready = this.fv / this.balanceNeeded;
        console.log('This .fv ' + this.fv);
        console.log('This .balanceNeeded: ' + this.balanceNeeded);

        console.log('The real ready is: ' + this.ready);
        // if (this.ready > 200) {
        //   this.ready = 200;
        // }
        // this.retirementReadinessVar = (this.ready / this.yearsToRetire);
        // this.guageComponent.retirementReadiness = this.ready;
        // this.guageComponent.setRetirementReadiness(this.ready);
      },
      bad => {
        console.log('A bad thing happened');
        console.log(bad);
      },
      () => {}
    );
    this.assets.forEach(function(asset) {
      const i = this.ror / 100 / asset.vehicle.compoundingPeriods;
      const t = asset.vehicle.compoundingPeriods * this.yearsToRetire;
      const d = asset.periodicDeposit;
      const x = 1 + i;
      console.log(i);
      console.log(t);
      console.log(d);
      console.log(x);
      this.fv +=
        asset.amount * Math.pow(x, t) + d * ((Math.pow(x, t) - 1) / i) * x;
    });

    console.log('End futureValueOfAssets()');
    return this.fv;
  }

  balanceNeededAtRetirement() {
    // const regularWithdrawals =
    //   (this.user.userProfile.income *
    //     (this.user.userProfile.percentIncome / 100)) /
    //   12;
    // const numofCompPerYr = 12;

    // this.balanceNeeded =
    //   (regularWithdrawals *
    //     (1 -
    //       Math.pow(
    //         1 + this.annualRateAtRetirement / numofCompPerYr,
    //         -(this.yearsInRetirement() * numofCompPerYr)
    //       ))) /
    //   (this.annualRateAtRetirement / numofCompPerYr);
    // return this.balanceNeeded;
    const payment = (this.user.userProfile.income / 12 ) * (this.user.userProfile.percentIncome / 100);
    console.log(payment);
    const yir = this.user.userProfile.lifeExpectancy -
    this.user.userProfile.retirementAge;
    console.log(yir);
    this.balanceNeeded = payment * ((1 - (Math.pow( 1 + this.ror, (yir *12)))) / this.ror);
    return this.balanceNeeded;
  }

  yearsInRetirement() {
    const yir =
      this.user.userProfile.lifeExpectancy -
      this.user.userProfile.retirementAge;
    return yir;
  }

  retirementReadiness() {
    console.log('Begin retiermentReadiness()');
    this.balanceNeededAtRetirement();
    this.futureValueOfAssets();
    // this.ready = this.fv / this.balanceNeeded;
    console.log(('balance Needed: ' + this.balanceNeeded));
    console.log('Ready: ' + this.ready);
    console.log('this fv: ' + this.fv);

    console.log('End retiermentReadiness()');
    return this.ready;
  }

  monthlyRetirementIncome() {
    this.payments =
      (this.futureValueOfAssets() * this.annualRateAtRetirement) /
      (Math.pow(1 + this.annualRateAtRetirement, this.yearsInRetirement()) - 1);
  }
}
