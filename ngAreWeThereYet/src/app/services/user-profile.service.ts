
import { AuthenticationService } from './authentication.service';
import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserProfile } from '../models/user-profile';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  // Fields
    // TODO: Change port number/api route
    // private baseUrl = 'http://localhost:8085/';
    // private url = this.baseUrl + 'api/profiles';
    private url = environment.baseUrl + 'api/profiles';

  // Constructor
  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  // Fields
  handleError(error: any) {
    console.error('Something Broke');
    return throwError(error.json().error || 'Server Error');
  }

  create(userProfile: UserProfile) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<UserProfile>(this.url, userProfile, httpOptions)
    .pipe(catchError(this.handleError));
  }

  // TODO: Find correct edit function
  update(updateUserProfile: UserProfile) {
    const credentials = this.authService.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      })
    };
    return this.http
    .put(this.url + '/' + updateUserProfile.id, updateUserProfile, httpOptions)
    .pipe();
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

  ageFromDateOfBirthday(dateOfBirth: any): number {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return moment().diff(dateOfBirth, 'years');
  }

}
