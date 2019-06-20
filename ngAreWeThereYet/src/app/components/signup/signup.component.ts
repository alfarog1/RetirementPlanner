import { UserService } from './../../services/user.service';
import { UserProfile } from './../../models/user-profile';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Asset } from 'src/app/models/asset';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newUser: User = new User();
  newUserProfile: UserProfile = new UserProfile();

  constructor(private usersvc: UserService) {
    console.log(this.newUser.username);
    console.log(this.newUser.password);
    console.log(this.newUser.email);
  }

  createUser() {
    this.newUser.userProfile = this.newUserProfile;
    this.usersvc.create(this.newUser);
  }

  ngOnInit() {
  }

}
