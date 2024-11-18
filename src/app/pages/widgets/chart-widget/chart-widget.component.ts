import { Component, Input, OnInit } from '@angular/core';
import { ApexChartOptions } from 'src/app/pages/charts/charts.model';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements OnInit {

  @Input() title?: string;
  @Input() stats?: string;
  @Input() chartColor?: string[];
  @Input() chartData?: number[];
  chartOptions: Partial<ApexChartOptions> = {};

  constructor () { }

  ngOnInit(): void {
    let labelsSales = [];
    for (var i = 1; i <= 10; i++) {
      labelsSales.push('2018-09-' + i);
    }
    this.chartOptions = {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },
      fill: {
        opacity: 0.2,
      },
      series: [{
        name: 'Data',
        data: this.chartData || []
      }],
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        min: 0
      },
      tooltip: {
        x: {
          show: false
        },
        theme: 'dark'
      },
      colors: this.chartColor || ['#5369f8'],
      labels: labelsSales,
      title: {
        text: this.stats,
        offsetX: 5,
        offsetY: 10,
        margin: 0,
        style: {
          fontSize: '24px'
        }
      },
      subtitle: {
        text: this.title,
        offsetX: 5,
        offsetY: 45,
        margin: 0,
        style: {
          fontSize: '16px'
        }
      }
    }
  }

}
