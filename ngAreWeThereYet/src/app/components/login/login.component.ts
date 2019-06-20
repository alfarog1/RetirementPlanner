import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    const loginData = form.value;
    console.log(loginData);
    this.auth.login(loginData.username, loginData.password).subscribe(
      data => {
        this.router.navigateByUrl('/something');
      },
      err =>  {
        console.log('Error logging in');
        this.router.navigateByUrl('/login');
      },
    );


    }
}
