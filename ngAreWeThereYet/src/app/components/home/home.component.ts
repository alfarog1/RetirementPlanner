import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartLayoutOptions } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";
import { trigger, transition, animate, style } from "@angular/animations";
import { Asset } from 'src/app/models/asset';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  animations: [
    trigger("slideInLeft", [
      transition(":enter", [
        style({ transform: "translateX(-100%)" }),
        animate("400ms ease-in", style({ transform: "translateX(0%)" }))
      ]),
      transition(":leave", [
        animate("400ms ease-in", style({ transform: "translateX(-100%)" }))
      ])
    ]),
    trigger("slideInRight", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("400ms ease-in", style({ transform: "translateX(0%)" }))
      ]),
      transition(":leave", [
        animate("400ms ease-in", style({ transform: "translateX(100%)" }))
      ])
    ]),
    trigger("slideInTop", [
      transition(":enter", [
        style({ transform: "translateY(-100%)" }),
        animate("400ms ease-in", style({ transform: "translateY(0%)" }))
      ]),
      transition(":leave", [
        animate("400ms ease-in", style({ transform: "translateY(-100%)" }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  assets: Asset[] = [];
  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  count5 = 0;
  count6 = 0;
  count7 = 0;
  count8 = 0;
  count9 = 0;
  count10 = 0;
  count11 = 0;
  count12 = 0;
  count13 = 0;
  count14 = 0;
  count15 = 0;
  count16 = 0;
  count17 = 0;
  stocksAvg: number = 60;
  savingsAvg: number = 300;
  annuityAvg: number = 500;
  traIraAvg: number = 100;
  rothIraAvg: number = 75;
  avg457b: number = 50;
  avg401k: number = 45;
  avg401a: number = 200;
  avg403b: number = 100;
  avg457: number = 100;
  invPropAvg: number = 75;
  nonQualAvg: number = 30;
  profitShareAvg: number = 35;
  monPurAvg: number = 90;
  mutFunAvg: number = 10;
  tspAvg: number = 30;
  bondsAvg: number= 20;
  constructor(private assetService: AssetService
  ) { }

  ngOnInit() {
    this.averageBalancePerAsset();
    this.reload();
  }
  visible = false;

  onClickMe() {
    this.visible = !this.visible;
  }

  // Doughnut  1
  public doughnutChartLabels: Label[] = ["Stocks",
  "Bonds",
  "Savings",
  "Annuity",
  "Traditional IRA",
  "Roth IRA",
  "457b",
  "401k",
  "401a",
  "403b",
  "457",
  "Investment Property",
  "Non-Qualified",
  "Profit Sharing",
  "Money Purchase",
  "Mutual Fund",
  "TSP"
];
  public doughnutChartData: MultiDataSet = [
    [this.count1, this.count2, this.count3, this.count4, this.count5,this.count6,this.count7,this.count8,this.count9,this.count10,this.count11,this.count12,this.count13,this.count14,this.count15,this.count16,this.count17]
    
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType: ChartType = "doughnut";

  // Doughnut 2
  public doughnutChartLabels2: Label[] = [
    "Ready to retire",
    "Nothing started",
    "Working on it",
    "Retire?"
  ];
  public doughnutChartData2: MultiDataSet = [
    [50, 450, 400, 300]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType2: ChartType = "doughnut";

  // Doughnut 3
  public doughnutChartLabels3: Label[] = [
    "Stocks",
    "Bonds",
    "Savings",
    "Annuity",
    "Traditional IRA",
    "Roth IRA",
    "457b",
    "401k",
    "401a",
    "403b",
    "457",
    "Investment Property",
    "Non-Qualified",
    "Profit Sharing",
    "Money Purchase",
    "Mutual Fund",
    "TSP"
  ];
  public doughnutChartData3: MultiDataSet = [
    [this.stocksAvg, this.bondsAvg, this.savingsAvg, this.annuityAvg, this.traIraAvg, this.rothIraAvg, this.avg457b, this.avg401k, this.avg401a, this.avg403b, this.avg457, this.invPropAvg, this.nonQualAvg, this.profitShareAvg, this.monPurAvg, this.mutFunAvg, this.tspAvg]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType3: ChartType = "doughnut";

  // Doughnut 4
  public doughnutChartLabels4: Label[] = [
    "Found this helpful",
    "Never knew this",
    "WOW",
    "Retire?"
  ];
  public doughnutChartData4: MultiDataSet = [
    [650, 450, 400, 30]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType4: ChartType = "doughnut";

  public donutColors = [
    {
      backgroundColor: [
        "#d43d51",
        "#ffff9d",
        "#63b179",
        "#ef8250",
        "#aed987",
        "#fcc267",
        "#00876c"
      ]
    }
  ];

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  reload() {
    this.assetService.index().subscribe(
      good => {
        this.assets = good;
        console.log(this.assets);
      },
      bad => {
        console.log(bad);
      }
    )
  }
  averageBalancePerAsset() {
    console.log(this.assets);
    for (let i = 0; i < this.assets.length; i++) {
      console.log(this.assets[i]);
      switch (this.assets[i].vehicle.id) {

        case 1:
          let value1 = this.assets[i].amount;
          let count1 = 0;
          count1++;
          this.stocksAvg = value1 / count1;
          break;
        case 2:
          let value2 = this.assets[i].amount;
          this.count2++;
          this.bondsAvg = value2 / this.count2;
          break;
        case 3:
          let value3 = this.assets[i].amount;
          this.count3++;
          this.savingsAvg = value3 / this.count3;
          break;
        case 4:
          let value4 = this.assets[i].amount;
          this.count4++;
          this.annuityAvg = value4 / this.count4;
          break;
        case 5:
          let value5 = this.assets[i].amount;
          this.count5++;
          this.traIraAvg = value5 / this.count5;
          break;
        case 6:
          let value6 = this.assets[i].amount;
          this.count6++;
          this.rothIraAvg = value6 / this.count6;
          break;
        case 7:
          let value7 = this.assets[i].amount;
          this.count7++;
          this.avg457b = value7 / this.count7;
          break;
        case 8:
          let value8 = this.assets[i].amount;
          this.count8++;
          this.avg401k = value8 / this.count8;
          break;
        case 9:
          let value9 = this.assets[i].amount;
          this.count9++;
          this.avg401a = value9 / this.count9;
          break;
        case 10:
          let value10 = this.assets[i].amount;
          this.count10++;
          this.avg403b = value10 / this.count10;
          break;
        case 11:
          let value11 = this.assets[i].amount;
          this.count11++;
          this.avg457 = value11 / this.count11;
          break;
        case 12:
          let value12 = this.assets[i].amount;
          this.count12++;
          this.invPropAvg = value12 / this.count12;
          break;
        case 13:
          let value13 = this.assets[i].amount;
          this.count13++;
          this.nonQualAvg = value13 / this.count13;
          break;
        case 14:
          let value14 = this.assets[i].amount;
          this.count14++;
          this.profitShareAvg = value14 / this.count14;
          break;
        case 15:
          let value15 = this.assets[i].amount;
          this.count15++;
          this.monPurAvg = value15 / this.count15;
          break;
        case 16:
          let value16 = this.assets[i].amount;
          this.count16++;
          this.mutFunAvg = value16 / this.count16;
          break;
        case 17:
          let value17 = this.assets[i].amount;
          this.count17++;
          this.tspAvg = value17 / this.count17;
          break;
      }
    }



  }
}
