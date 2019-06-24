import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  gaugeType = "semi";
  retirementReadiness = 80; // <----
  gaugeLabel = "Retirement Readiness";
  animate = true;
  thickness = 15;
  // gaugeAppendText = "km/hr";

  thresholdConfig = {
    '0': {color: 'red'},
    '40': {color: 'orange'},
    '75.5': {color: 'green'}
};
}
