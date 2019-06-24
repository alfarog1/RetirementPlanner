import { Vehicle } from './../../models/vehicle';
import { EmployerMatch } from './../../models/employer-match';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-modal-options",
  templateUrl: "./modal-options.component.html",
  styleUrls: ["./modal-options.component.css"],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #292b2c;
        color: white;
      }
      .dark-modal .close {
        color: white;
      }
      .light-blue-backdrop {
        background-color: #5cb3fd;
      }
    `
  ]
})
export class ModalOptionsComponent implements OnInit {
  balance: boolean;
  contribution: boolean;
  investment: string;
  appear: boolean;
  recurring: boolean;
  match: boolean;
  employerMatch: boolean;
  employerMatchPlan = ["457", "401K", "401A", "403B", "Non-Qualified", "457B", "Profit Sharing", "Money Purchase", "TSP"];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: "light-blue-backdrop" });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: "dark-modal" });
  }

  openSm(content) {
    this.modalService.open(content, { size: "sm" });
  }

  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  currentBalance() {
    this.balance = !this.balance;
  }

  contribute() {
    this.investment = (document.getElementById("investmentAdd")as HTMLInputElement).value;
    this.contribution = true;
  }

  submitAppear() {
    this.appear = true;
  }

  recurringContribution() {
    this.appear = false;
    this.recurring = true;
  }

matchingContribution() {
  console.log(this.investment);

  if (this.employerMatchPlan.includes(this.investment) ) {
  this.match = true;
  // TEST
}

}

employerMatching() {
  this.employerMatch = true;
  this.appear = true;
}

}
