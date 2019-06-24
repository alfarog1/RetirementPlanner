import { VehicleService } from "./../../services/vehicle.service";
import { Asset } from "./../../models/asset";
import { Vehicle } from "./../../models/vehicle";
import { EmployerMatch } from "./../../models/employer-match";
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
  asset: Asset = new Asset();
  vehicles: Vehicle[] = [];
  balance: boolean;
  contribution: boolean;
  investment: string;
  appear: boolean;
  recurring: boolean;
  match: boolean;
  employerMatch: boolean;

  constructor(
    private modalService: NgbModal,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.getVehicles();
  }

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
    this.investment = (document.getElementById(
      "investmentAdd"
    ) as HTMLInputElement).value;
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

    // if (this.employerMatchPlan.includes(this.investment) ) {
    if (this.asset.vehicle.hasEmployerMatch) {
      this.match = true;
    } else {
      this.submitAppear();
    }
  }

  employerMatching() {
    this.employerMatch = true;
    this.appear = true;
  }

  getVehicles() {
    this.vehicleService.index().subscribe(
      data => {
        this.vehicles = data;
      },
      err => {
        console.log("error getting vehicles");
        console.log(err);
      }
    );
  }

  setVehicle(vehicle: Vehicle) {
    // let selectedOpt = document.getElementById('investmentAdd');
    // console.log(selectedOpt);

    // console.log(vehicle);
    // console.log(typeof vehicle);
    console.log(vehicle.assetName);
    this.asset.vehicle = vehicle;
  }
}
