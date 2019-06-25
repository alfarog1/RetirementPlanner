import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from './../../services/user.service';
import { UserProfile } from './../../models/user-profile';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Asset } from 'src/app/models/asset';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('650ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('650ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ]),
    trigger('slideInBottom', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('700ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class SignupComponent implements OnInit {



  newUser: User = new User();
  newUserProfile: UserProfile = new UserProfile();

  constructor(private usersvc: UserService,
              private router: Router,
              private auth: AuthenticationService,
              private modalService: NgbModal) {
  }
  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  cancel() {
    this.newUser = new User();
    this.newUserProfile = new UserProfile();
    this.router.navigateByUrl('/home');
  }

  createUser() {
    this.newUser.userProfile = this.newUserProfile;

    this.auth.register(this.newUser).subscribe(
      data => {
        this.auth.login(this.newUser.username, this.newUser.password).subscribe(
          seconddata => {
            this.router.navigateByUrl('/dashboard');
          },
          err => {
            console.log('error loging in after register:' + err);
          }

        ); },
          err => {
            console.log('error creating user:' + err);
          }
    );
  }

  ngOnInit() {
  }

}
