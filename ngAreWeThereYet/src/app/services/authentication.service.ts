import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  // Fields
  private baseUrl = "http://localhost:8085/";
  private url = this.baseUrl + "";

  // Constructor
  constructor(private http: HttpClient, private router: Router) {}

  // Methods
  generateBasicAuthCredentials(username, password) {
    return btoa(`${username}:${password}`);
  }

  getCredentials() {
    return localStorage.getItem("credentials");
  }

  login(username, password) {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    // Send credentials as Authorization header (this is spring security convention for basic auth)
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        "X-Requested-With": "XMLHttpRequest"
      })
    };
    // create request to authenticate credentials
    return this.http.get(this.url + "authenticate", httpOptions).pipe(
      tap(res => {
        localStorage.setItem("credentials", credentials);
        return res;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError("AuthService.login(): Error logging in.");
      })
    );
  }

  checkLogin() {
    if (localStorage.getItem("credentials")) {
      return true;
    }
    return false;
  }

  register(user) {
    console.log("in auth.register()");
    console.log(user);

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    // create request to register a new account
    return this.http.post(this.url + "register", user, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("AuthService.register(): error registering user.");
      })
    );
  }

  logout() {
    localStorage.removeItem("credentials");
    this.router.navigateByUrl("home");
  }
}
