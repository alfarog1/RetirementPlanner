import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  status: Boolean = false;
  editUser: User = null;
  closeResult: string;


  constructor(private user: UserService, private route: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.retrieveUsers();
    
  }
  editUserMethod(user) {
    this.editUser = user;
  }
  deactivateAccount() {
    console.log(this.editUser);
    this.editUser.enabled = false;
    this.user.update(this.editUser).subscribe(
      good => {
        this.editUser = null;
        this.retrieveUsers();
      },
      bad =>{
        console.log(bad);
      }
    );
  }
  activateAccount() {
    this.editUser.enabled = true;
    this.user.update(this.editUser).subscribe(
      good => {
        this.editUser = null;
        this.retrieveUsers();
      },
      bad =>{
        console.log(bad);
      }
    );
  }
  userStatus(user: User) {
    if (user.enabled = true) {
      this.status = true;
    }
  }
  retrieveUsers() {
    this.user.index().subscribe(
      good => {
        this.users = good;
      },
      bad => {
        console.log(bad);
      }
    )
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("customers");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}


