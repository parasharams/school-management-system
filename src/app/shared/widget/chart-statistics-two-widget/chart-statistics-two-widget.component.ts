import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { ApexChartOptions } from 'src/app/pages/charts/charts.model';

@Component({
  selector: 'app-chart-statistics-two-widget',
  templateUrl: './chart-statistics-two-widget.component.html',
  styleUrls: ['./chart-statistics-two-widget.component.scss']
})
export class ChartStatisticsTwoWidgetComponent implements OnInit {

  @Input() containerClass?: string = '';
  @Input() title?: string;
  @Input() userCount?: string;
  @Input() subValue?: string;
  @Input() variant?: string;
  @Input() chartType?: ChartType;
  @Input() chartData?: number[];
  @Input() chartColors?: string[];
  chartOptions: Partial<ApexChartOptions> = {};

  constructor () { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: this.chartType || 'bar',
        // width: 100,
        height: 60,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '80%'
        }
      },

      colors: this.chartColors || ['#43d39e'],
      series: [{
        data: this.chartData || []
      }],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      stroke: {
        width: this.chartType === 'line' ? 2 : 0,
        curve: 'smooth'
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }
  }

}
