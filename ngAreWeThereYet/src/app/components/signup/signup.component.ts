import { UserService } from './../../services/user.service';
import { UserProfile } from './../../models/user-profile';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Asset } from 'src/app/models/asset';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

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

  constructor(private usersvc: UserService, private router: Router) {
  }

  createUser() {
    this.newUser.userProfile = this.newUserProfile;
    this.usersvc.create(this.newUser);
    this.router.navigateByUrl('/home');
  }

  ngOnInit() {
  }

}
