import { AuthenticationService } from './../../services/authentication.service';
import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartLayoutOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { trigger, transition, animate, style } from '@angular/animations';
import { Asset } from 'src/app/models/asset';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('400ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('400ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('400ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  constructor(
    private assetService: AssetService,
    private auth: AuthenticationService,
    private router: Router
  ) {}
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
  stocksAvg: number = 0;
  savingsAvg: number = 0;
  annuityAvg: number = 0;
  traIraAvg: number = 0;
  rothIraAvg: number = 0;
  avg457b: number = 0;
  avg401k: number = 0;
  avg401a: number = 0;
  avg403b: number = 0;
  avg457: number = 0;
  invPropAvg: number = 0;
  nonQualAvg: number = 0;
  profitShareAvg: number = 0;
  monPurAvg: number = 0;
  mutFunAvg: number = 0;
  tspAvg: number = 0;
  bondsAvg: number = 0;

  visible = false;

  // Doughnut  1
  public doughnutChartLabels: Label[] = [
    'Stocks',
    'Bonds',
    'Savings',
    'Annuity',
    'Traditional IRA',
    'Roth IRA',
    '457b',
    '401k',
    '401a',
    '403b',
    '457',
    'Investment Property',
    'Non-Qualified',
    'Profit Sharing',
    'Money Purchase',
    'Mutual Fund',
    'TSP'
  ];
  public doughnutChartData = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0

    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // Doughnut 2
  public doughnutChartLabels2: Label[] = [
    "Income hasn't changed or has decreased",
    "Comfortable with retirement savings",
    "Focusing on another financial priority",
    "Rising household expenses",
    "Haven't gotten around to it",
    "Dont know/refused",
    "Unexpected financial emergency"
  ];
  public doughnutChartData2: MultiDataSet = [
    [26, 21, 16, 12, 11, 10, 5]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType2: ChartType = 'doughnut';

  // Doughnut 3
  public doughnutChartLabels3: Label[] = [
    'Stocks',
    'Bonds',
    'Savings',
    'Annuity',
    'Traditional IRA',
    'Roth IRA',
    '457b',
    '401k',
    '401a',
    '403b',
    '457',
    'Investment Property',
    'Non-Qualified',
    'Profit Sharing',
    'Money Purchase',
    'Mutual Fund',
    'TSP'
  ];
  public doughnutChartData3 = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ];
  public doughnutChartType3: ChartType = 'doughnut';

  // Doughnut 4
  public doughnutChartLabels4: Label[] = [
    'Found this helpful',
    'Never knew this',
    'WOW',
    'Retire?'
  ];
  public doughnutChartData4: MultiDataSet = [
    [650, 450, 400, 30]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType4: ChartType = 'doughnut';

  public donutColors = [
    {
      backgroundColor: [
        "#d43d51",
        "#ffff9d",
        "#63b179",
        "#ef8250",
        "#aed987",
        "#fcc267",
        "#00876c",
        "#C40822",
        "#58871B",
        "#456D12",
        "#563E0B",
        "#17CC17",
        "#17CC6C",
        "#17CC9D",
        "#A40D14",
        "#F20510"
      ]
    }
  ];

  ngOnInit() {
    this.reload();
  }

  onClickMe() {
    this.visible = !this.visible;
  }

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
    if (this.auth.checkLogin()) {
      this.assetService.index().subscribe(
        good => {
          this.assets = good;
          this.averageBalancePerAsset();
          console.log(this.assets);
        },
        bad => {
          console.log(bad);
        }
      );
    }
  }
  signUp() {
    this.router.navigateByUrl('signup');
  }
  averageBalancePerAsset() {
    console.log(this.assets);
    let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let temp1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < this.assets.length; i++) {
      console.log(this.assets[i]);
      console.log(this.assets[i].vehicle.id);
      switch (this.assets[i].vehicle.id) {
        case 1:
          let value1 = this.assets[i].amount;
          temp[0]++;
          temp1[0] = value1 / temp[0];
          break;
        case 2:
          let value2 = this.assets[i].amount;
          temp[1]++;
          temp1[1] = value2 / temp[1];
          break;
        case 3:
          let value3 = this.assets[i].amount;
          temp[2]++;
          temp1[2] = value3 / temp[2];
          break;
        case 4:
          let value4 = this.assets[i].amount;
          temp[3]++;
          temp1[3] = value4 / temp[3];
          break;
        case 5:
          let value5 = this.assets[i].amount;
          temp[4]++;
          temp1[4] = value5 / temp[4];
          break;
        case 6:
          let value6 = this.assets[i].amount;
          temp[5]++;
          temp1[5] = value6 / temp[5];
          break;
        case 7:
          let value7 = this.assets[i].amount;
          temp[6]++;
          temp1[6] = value7 / temp[6];
          break;
        case 8:
          let value8 = this.assets[i].amount;
          temp[7]++;
          temp1[7] = value8 / temp[7];
          break;
        case 9:
          let value9 = this.assets[i].amount;
          temp[8]++;
          temp1[8] = value9 / temp[8];
          break;
        case 10:
          let value10 = this.assets[i].amount;
          temp[9]++;
          temp1[9] = value10 / temp[9];
          break;
        case 11:
          let value11 = this.assets[i].amount;
          temp[10]++;
          temp1[10] = value11 / temp[10];
          break;
        case 12:
          let value12 = this.assets[i].amount;
          temp[11]++;
          temp1[11] = value12 / temp[11];
          break;
        case 13:
          let value13 = this.assets[i].amount;
          temp[12]++;
          temp1[12] = value13 / temp[12];
          break;
        case 14:
          let value14 = this.assets[i].amount;
          temp[13]++;
          temp1[13] = value14 / temp[13];
          break;
        case 15:
          let value15 = this.assets[i].amount;
          temp[14]++;
          temp1[14] = value15 / temp[14];
          break;
        case 16:
          let value16 = this.assets[i].amount;
          temp[15]++;
          temp1[15] = value16 / temp[15];
          break;
        case 17:
          let value17 = this.assets[i].amount;
          temp[16]++;
          temp1[16] = value17 / temp[16];
          break;
      }
    }
    this.doughnutChartData = temp;
    this.doughnutChartData3 = temp1;
  }
}
