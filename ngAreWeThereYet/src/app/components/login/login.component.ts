import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  template: `
      <mat-card>
            <mat-card-title>Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="form" (ngSubmit)="submit()">
          <p>
            <mat-form-field>
              <input type="text" matInput placeholder="Username" formControlName="username">
            </mat-form-field>
          </p>
          <p>
            <mat-form-field>
              <input type="password" matInput placeholder="Password" formControlName="password">
            </mat-form-field>
          </p>
          <p *ngIf="error" class="loginError">
            {{ error }}
          </p>
          <p class="button">
            <button type="submit" mat-button>Login</button>
          </p>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }
      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }
      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }
      .error {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }
      .button {
        display: flex;
        justify-content: flex-end;
      }
    `
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });



  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
  }
 submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }
  @Input() error: string | null;


  @Output() submitEM = new EventEmitter();

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
