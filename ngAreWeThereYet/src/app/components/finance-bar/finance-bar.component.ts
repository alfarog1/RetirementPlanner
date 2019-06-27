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
  gaugeType = 'semi';
  retirementReadinessVar = 0;
  gaugeLabel = 'Retirement Readiness';
  animate = true;
  thickness = 15;

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
        this.retireAge = this.user.userProfile.retirementAge;
        this.futureValueOfAssets();
        this.balanceNeededAtRetirement();
        this.monthlyRetirementIncome();
        this.retirementReadiness();
        this.yearsToRetire =
          this.user.userProfile.retirementAge -
          this.userProService.ageFromDateOfBirthday(this.user.userProfile.dob);
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

        this.assets.forEach(asset => {
          if (asset.periodicDeposit !== 0) {
            const i = this.ror / 100;
            const t = this.yearsToRetire;
            const contribution =
              asset.contributionFixed !== null
                ? asset.contributionFixed
                : (asset.contributionPercent / 100) * this.user.userProfile.income;

            const d = asset.periodicDeposit * contribution;
            const x = 1 + i;

            const amountToAdd =
              asset.amount * Math.pow(x, t) +
              d * ((Math.pow(x, t) - 1) / i) * x;
            this.fv += amountToAdd;
          } else {
            const amountToAdd2 =  asset.amount * Math.pow(1 + this.ror / 100, this.yearsToRetire);
            this.fv += amountToAdd2;

          }
        });
        this.ready = (this.fv / this.balanceNeeded) * 100;
        if (this.ready > 100) {
          this.ready = 100;
        }
        this.retirementReadinessVar = this.ready;
        // this.retirementReadinessVar = (this.ready / this.yearsToRetire);
        // this.guageComponent.retirementReadiness = this.ready;
        // this.guageComponent.setRetirementReadiness(this.ready);

        this.assets.forEach((asset) => {
          const i = this.ror / 100 ;
          const t = this.yearsToRetire;
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
      },
      bad => {
        console.log('A bad thing happened');
        console.log(bad);
      },
      () => {}
    );

  }

  balanceNeededAtRetirement() {
    const p = (this.user.userProfile.income / 12) * (this.user.userProfile.percentIncome / 100);
    const n = 12 * (this.user.userProfile.lifeExpectancy -
          this.user.userProfile.retirementAge);
    const i = .13 / 12;
    this.balanceNeeded = p * ((Math.pow(1 + i, n) - 1) / i);
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
      (this.fv * this.annualRateAtRetirement) /
      (Math.pow(1 + this.annualRateAtRetirement, this.yearsInRetirement()) - 1);
  }
}
