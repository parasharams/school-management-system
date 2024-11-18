import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'ng-apexcharts';
import { ApexChartOptions } from 'src/app/pages/charts/charts.model';

@Component({
  selector: 'app-chart-statistics-widget',
  templateUrl: './chart-statistics-widget.component.html',
  styleUrls: ['./chart-statistics-widget.component.scss']
})
export class ChartStatisticsWidgetComponent implements OnInit {

  @Input() mainTitle?: string;
  @Input() value?: number | string;
  @Input() subValue?: number;
  @Input() chartType?: ChartType;
  @Input() chartData?: number[];
  @Input() chartColors?: string[];
  chartOptions: Partial<ApexChartOptions> = {};


  constructor () { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: this.chartType || 'area',
        height: 45,
        width: 75,
        sparkline: {
          enabled: true
        }
      },
      series: [{
        data: this.chartData || []
      }],
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      markers: {
        size: 0
      },
      colors: this.chartColors || ["#727cf5"],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        theme: 'dark',
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
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [45, 100]
        },
      }
    }
  }

}
