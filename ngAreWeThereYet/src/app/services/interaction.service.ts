import { AssetdisplayComponent } from './../components/assetdisplay/assetdisplay.component';
import { Injectable } from '@angular/core';
import { RetiregoalsComponent } from '../components/retiregoals/retiregoals.component';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private retireGoals: RetiregoalsComponent) { }

 refresh(){
   this.retireGoals.ngOnInit();
 }
}
