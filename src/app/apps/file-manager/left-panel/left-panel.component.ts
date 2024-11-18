import { Component, OnInit } from '@angular/core';
import { ApexChartOptions } from 'src/app/pages/charts/charts.model';

@Component({
  selector: 'app-file-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  chartOptions: Partial<ApexChartOptions> = {};

  constructor () { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        height: 225,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70% used',
          }
        },
      },
      colors: ["#43d39e"],
      series: [58],
      labels: ['256 GB'],
    }
  }

}
