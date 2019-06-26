import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Asset } from 'src/app/models/asset';
import { RiskProfileService } from 'src/app/services/risk-profile.service';
import { RiskProfile } from 'src/app/models/risk-profile';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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

  constructor(private modalService: NgbModal,
    private assetsvc: AssetService,
    private risksvc: RiskProfileService,
    private router: Router) { }

  ngOnInit() {
    this.getRisks();
    this.loadAssets();
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

}
