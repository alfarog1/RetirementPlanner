import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Fields
  // TODO: Change port number/api route
  // private baseUrl = 'http://localhost:8085/';
  // private url = this.baseUrl + 'api/users';
  private url = environment.baseUrl + 'api/users';
  user: User;

  // Constructor
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  // Methods
  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
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
      return this.http.get<User[]>(this.url, httpOptions);
    }
  }

  create(user: User) {
    console.log(user);

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
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
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

  getUser() {
    if (this.authService.checkLogin()) {
      const credentials = this.authService.getCredentials();
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Basic ${credentials}`,
          'X-Requested-With': 'XMLHttpRequest'
        })
      };
      return this.http.get<User>(this.url + '/user', httpOptions);
    }
  }

}
