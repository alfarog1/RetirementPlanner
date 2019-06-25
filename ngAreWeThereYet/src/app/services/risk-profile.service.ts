import { AuthenticationService } from 'src/app/services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { RiskProfile } from '../models/risk-profile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskProfileService {
  // Fields
  // TODO: Change port number/api route
  // private baseUrl = 'http://localhost:8085/';
  // private url = this.baseUrl + 'api/risks';
    private url = environment.baseUrl + 'api/risks';

  // Constructor
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  // Methods
  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }

  create(risk: RiskProfile) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<RiskProfile>(this.url, risk, httpOptions)
    .pipe(catchError(this.handleError));
  }

  // TODO: Find correct edit function
  update(risk: RiskProfile) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
    .put(this.url + '/' + risk.id, risk, httpOptions)
    .pipe(catchError(this.handleError));
  }

  destroy(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url + '/' + id, httpOptions)
    .pipe(catchError(this.handleError));
  }
  getAll() {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<RiskProfile[]>(this.url + '', httpOptions)
    .pipe(catchError(this.handleError));
  }

}
