import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartLayoutOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-risk-questionnaire',
  templateUrl: 'risk-questionnaire.component.html',
  styleUrls: ['./risk-questionnaire.component.css'],
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
export class RiskQuestionnaireComponent implements OnInit {
  // Fields
  visible = false;
  question1: number = 0;
  question2: number = 0;
  question3: number = 0;
  question4: number = 0;
  question5: number = 0;
  totalScore: number = 0;

  // Doughnut 1 - Conservative
  public doughnutChartLabels: Label[] = [
    'Bonds',
    'Large Cap',
    'Mid Cap',
    'Small Cap',
    'International',
    'Cash'
  ];
  public doughnutChartData: MultiDataSet = [
    [40, 10, 50, 0, 5, 40]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // Doughnut 2 - Moderately Conservative
  public doughnutChartLabels2: Label[] = [
    'Bonds',
    'Large Cap',
    'Mid Cap',
    'Small Cap',
    'International',
    'Cash'
  ];
  public doughnutChartData2: MultiDataSet = [
    [35, 20, 10, 0, 10, 25]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType2: ChartType = 'doughnut';

  // Doughnut 3 - Moderate
  public doughnutChartLabels3: Label[] = [
    'Bonds',
    'Large Cap',
    'Mid Cap',
    'Small Cap',
    'International',
    'Cash'
  ];
  public doughnutChartData3: MultiDataSet = [
    [25, 20, 10, 5, 15, 15]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType3: ChartType = 'doughnut';

  // Doughnut 4 - Moderately Aggressive
  public doughnutChartLabels4: Label[] = [
    'Bonds',
    'Large Cap',
    'Mid Cap',
    'Small Cap',
    'International',
    'Cash'
  ];
  public doughnutChartData4: MultiDataSet = [
    [15, 35, 15, 5, 25, 5]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType4: ChartType = 'doughnut';

  // Doughnut 5 - Aggressive
  public doughnutChartLabels5: Label[] = [
    'Bonds',
    'Large Cap',
    'Mid Cap',
    'Small Cap',
    'International',
    'Cash'
  ];
  public doughnutChartData5: MultiDataSet = [
    [5, 40, 15, 10, 30, 0]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType5: ChartType = 'doughnut';

  // Doughnut Colors
  public donutColors = [
    {
      backgroundColor: [
        '#d43d51',
        '#ffff9d',
        '#63b179',
        '#ef8250',
        '#aed987',
        '#fcc267',
        '#00876c'
      ]
    }
  ];
  // Constructor
  constructor() {}

  // Methods
  ngOnInit() {}

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

  public calculatePoints() {
    this.totalScore =
      (+this.question1) +
      (+this.question2) +
      (+this.question3) +
      (+this.question4) +
      (+this.question5);
    console.log(this.totalScore);
  }
}
