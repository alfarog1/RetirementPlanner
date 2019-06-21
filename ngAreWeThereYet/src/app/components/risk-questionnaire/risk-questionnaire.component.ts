import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartLayoutOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-risk-questionnaire',
  templateUrl: './risk-questionnaire.component.html',
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

  // Constructor
  constructor() {}

  // Doughnut 1
  public doughnutChartLabels: Label[] = ['Savings', '401k', 'IRA', 'Bonds'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100, 20]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  // Doughnut 2
  public doughnutChartLabels2: Label[] = [
    'Ready to retire',
    'Nothing started',
    'Working on it',
    'Retire?'
  ];
  public doughnutChartData2: MultiDataSet = [
    [50, 450, 400, 300]
    // [50, 150, 120],
    // [250, 130, 70],
  ];
  public doughnutChartType2: ChartType = 'doughnut';

  // Doughnut 3
  public doughnutChartLabels3: Label[] = [
    'Stocks',
    'Bonds',
    'Savings',
    '401k',
    'TSP',
    'Pension',
    'IRA'
  ];
  public doughnutChartData3: MultiDataSet = [
    [50, 450, 400, 300, 600, 200, 350]
    // [50, 150, 120],
    // [250, 130, 70],
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

  // Methods
  ngOnInit() {}

  onClickMe(){
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


}
