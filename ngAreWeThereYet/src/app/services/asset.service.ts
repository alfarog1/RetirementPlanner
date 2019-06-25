import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Asset } from '../models/asset';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  // Fields
  private baseUrl = 'http://localhost:8085/';
  private url = this.baseUrl + 'api/assets';

  fv = 0;
  balanceNeeded = 0;
  annualRateAtRetirement = 4;
  ror: number;
  assets: Asset[] = [];
  yearsToRetire: number;
  ready = 0;
  user: User;
    percentOfIncome: 80;
  payments = 0;


  // Constructor
  constructor(private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  // Methods
  index() {
    if (this.authService.checkLogin()) {
      const credentials = this.authService.getCredentials();
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${credentials}`,
          'X-Requested-With': 'XMLHttpRequest'
        })
      };
      return this.http.get<Asset[]>(this.url, httpOptions);
    }
  }
  getUsersAssets() {
    if (this.authService.checkLogin()) {
      const credentials = this.authService.getCredentials();
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${credentials}`,
          'X-Requested-With': 'XMLHttpRequest'
        })
      };
      return this.http.get<Asset[]>(this.url + '/user', httpOptions).pipe(catchError(this.handleError));
    }
  }
  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }

  create(asset: Asset) {
    console.log('in create in asset.service');
    console.log(asset);
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Asset>(this.url, asset, httpOptions)
      .pipe(catchError(this.handleError));
  }

  // TODO: Find correct edit function
  update(updateAsset: Asset) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .put(this.url + '/' + updateAsset.id, updateAsset, httpOptions)
      .pipe(catchError(this.handleError));
  }

  destroy(id: number) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url + '/' + id, httpOptions)
      .pipe(catchError(this.handleError));
  }
  averageValueOfAssets() {

  }

  futureValueOfAssets() {
    this.getUsersAssets().subscribe(
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
const i = this.ror/asset.vehicle.compoundingPeriods;
const t = asset.vehicle.compoundingPeriods * this.yearsToRetire;
const d = asset.periodicDeposit;
const x = 1 + i;
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
