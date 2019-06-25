import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  // Fields
  // TODO: Change port number/api route
  // private baseUrl = 'http://localhost:8085/';
  // private url = this.baseUrl + '';
  private url = environment.baseUrl + '';

  // Constructor
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  // Methods
  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }

  create(vehicle: Vehicle) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Vehicle>(this.url, vehicle, httpOptions)
    .pipe(catchError(this.handleError));
  }

  // TODO: Find correct edit function
  update(vehicle: Vehicle) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
    .put(this.url + 'api/vehicles' + vehicle.id, vehicle, httpOptions)
    .pipe(catchError(this.handleError));
  }

  destroy(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url + 'api/vehicles' + id, httpOptions)
    .pipe(catchError(this.handleError));
  }
  index() {
    if (this.authService.checkLogin()) {
      const credentials = this.authService.getCredentials();
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${credentials}`,
          'X-Requested-With': 'XMLHttpRequest'
        })
      };
      return this.http.get<Vehicle[]>(this.url + 'api/vehicles', httpOptions);
    }
  }
}
