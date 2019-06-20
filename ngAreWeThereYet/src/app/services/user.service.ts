import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Fields
  // TODO: Change port number/api route
  private baseUrl = 'http://localhost:8085/';
  private url = this.baseUrl + '';

  // Constructor
  constructor(private http: HttpClient) { }

  // Methods
  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }

  create(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<User>(this.url, user, httpOptions)
    .pipe(catchError(this.handleError));
  }

  // TODO: Find correct edit function
  update(updateUser: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
    .put(this.url + '/' + updateUser.id, updateUser, httpOptions)
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
