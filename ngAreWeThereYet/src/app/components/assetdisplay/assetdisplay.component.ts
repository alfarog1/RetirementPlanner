import { UserService } from './../../services/user.service';
import { VehicleService } from './../../services/vehicle.service';
import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';
import { RiskProfileService } from 'src/app/services/risk-profile.service';
import { RiskProfile } from 'src/app/models/risk-profile';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { EmployerMatch } from 'src/app/models/employer-match';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-assetdisplay',
  templateUrl: './assetdisplay.component.html',
  styleUrls: ['./assetdisplay.component.css']

})
export class AssetdisplayComponent implements OnInit {

  risks: RiskProfile[] = [];
  editAsset: Asset = null;
  assets: Asset[] = [];
  tempAsset: Asset;
  expand = 0;
  closeResult: string;
  asset: Asset = new Asset();
  vehicles: Vehicle[] = [];
  newEmployerMatch1: EmployerMatch = new EmployerMatch();
  newEmployerMatch2: EmployerMatch = new EmployerMatch();
  contributeType = 'fixed';
  contribute: number = 0;
  user: User;
  balance: boolean;
  contribution: boolean;
  investment: string;
  appear: boolean;
  recurring: false;
  match: boolean;
  employerMatch: boolean;

  constructor(private modalService: NgbModal,
    private assetsvc: AssetService,
    private risksvc: RiskProfileService,
    private router: Router,
    private vehicleSvc: VehicleService,
    private userService: UserService) { }

  ngOnInit() {
    this.getRisks();
    this.loadAssets();
    this.getVehicles();
    this.asset.employerMatch = [];
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


  loadAssets() {
    this.assetsvc.getUsersAssets().subscribe(
      data => {
        this.assets = data;
      },
      err => {
        console.log('error getting user assets:' + err);
      }
    );
  }
  deleteAsset() {
    this.assetsvc.destroy(this.editAsset.id).subscribe(
      data => {
        this.loadAssets();
        this.editAsset = null;
      },
      err => {
        console.log('error deleting asset:');
        console.log(err);
      }
    );
  }
  getRisks() {
    this.risksvc.getAll().subscribe(
      data => {
        this.risks = data;
      },
      err => {
        console.log('error getting risk profiles:');
        console.log(err);
      }
    );
  }
  commitEditAsset() {
    this.assetsvc.update(this.editAsset).subscribe(
      data => {
        this.loadAssets();
        this.router.navigateByUrl('/retireGoals', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/dashboard']));
        this.editAsset = null;

      },
      err => {
        console.log('error updating asset:');
        console.log(err);
      }
    );
  }
  editAssets(asset) {
    this.editAsset = asset;
    this.commitEditAsset();
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
    this.assetsvc.create(this.asset).subscribe(
      data => {
       console.log('asset creation success');
       this.ngOnInit();
       this.asset = new Asset();
       this.contribute = 0;
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
    this.vehicleSvc.index().subscribe(
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


