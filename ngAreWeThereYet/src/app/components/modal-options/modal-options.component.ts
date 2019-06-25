import { AssetService } from './../../services/asset.service';
import { UserService } from './../../services/user.service';
import { VehicleService } from "./../../services/vehicle.service";
import { Asset } from "./../../models/asset";
import { Vehicle } from "./../../models/vehicle";
import { EmployerMatch } from "./../../models/employer-match";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from 'src/app/models/user';

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
  newEmployerMatch1: EmployerMatch = new EmployerMatch();
  newEmployerMatch2: EmployerMatch = new EmployerMatch();
  contributeType = 'fixed';
  user: User;
  balance: boolean;
  contribution: boolean;
  investment: string;
  appear: boolean;
  recurring: false;
  match: boolean;
  employerMatch: boolean;

  constructor(
    private userService: UserService,
    private assetService: AssetService,
    private modalService: NgbModal,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.getVehicles();
    this.asset.employerMatch = [];
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

  confirmSubmit() {
    this.asset.user = this.user;
    if (this.newEmployerMatch1.topThreshold > 0) {
      this.asset.employerMatch.push(this.newEmployerMatch1);
    }
    if (this.newEmployerMatch2.topThreshold > 0) {
      this.asset.employerMatch.push(this.newEmployerMatch2);
    }
    console.log('in confirm submit')
    console.log(this.asset);
    this.assetService.create(this.asset).subscribe(
      data => {
       console.log('asset creation success');
      },
      err => {
        console.log('error adding asset');
        console.log(err);
      }
    );
  }

  getUser() {
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
      },
      err => {
        console.log('error retrieving user:');
        console.log(err);

      }
    );
  }
  // currentBalance() {
  //   this.balance = !this.balance;
  // }

  // contribute() {
  //   this.contribution = 1;
  // }

  submitAppear() {
    this.appear = true;
  }

  // recurringContribution() {
  //   this.appear = false;
  //   this.recurring = true;
  // }

  matchingContribution() {
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
    console.log(vehicle.assetName);
    this.asset.vehicle = vehicle;
  }
}
