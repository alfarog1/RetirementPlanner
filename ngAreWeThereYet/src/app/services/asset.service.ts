import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  // Fields
  private baseUrl = 'http://localhost:8085/';
  private url = this.baseUrl + 'api/assets';

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
      return this.http.get<Asset[]>(this.url + '/user', httpOptions);
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

}
