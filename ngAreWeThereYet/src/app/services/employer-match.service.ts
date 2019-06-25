import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { EmployerMatch } from '../models/employer-match';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerMatchService {
  // Fields
  //  TODO: Change port number/api route
  // private baseUrl = 'http://localhost:8085/';
  // private url = this.baseUrl + '';
  private url = environment.baseUrl + '';

  // Constructor
  constructor(private http: HttpClient) {}

  // Methods
  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }

  create(employer: EmployerMatch) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<EmployerMatch>(this.url, employer, httpOptions)
    .pipe(catchError(this.handleError));
  }

  // TODO: Find correct edit function
  update(employer: EmployerMatch) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
    .put(this.url + '/' + employer.id, employer, httpOptions)
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

}
