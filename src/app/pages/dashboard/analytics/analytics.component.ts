import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApexChartOptions, Point, Range } from '../../charts/charts.model';
import { ChannelsTypes, EngagementOverviewsTypes, PlatformTypes, SourcesTypes, ViewsDetailTypes } from './analytics.model';
import { CHANNELS, DATESERIES, ENGAGEMENETOVERVIEW, PLATFORMS, SOURCES, VIEWDETAILS } from './data';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  active: string = 'views';

  // chart configs
  subscriberChart: Partial<ApexChartOptions> = {};
  totalViewsChart: Partial<ApexChartOptions> = {};
  bounceRateChart: Partial<ApexChartOptions> = {};
  mediaTrafficChart: Partial<ApexChartOptions> = {};
  browserChart: Partial<ApexChartOptions> = {};

  // data variables
  sourceList: SourcesTypes[] = [];
  engagementOverviews: EngagementOverviewsTypes[] = [];
  platformList: PlatformTypes[] = [];
  channelList: ChannelsTypes[] = [];
  viewDetails: ViewsDetailTypes[] = [];

  lastDate: number = 0;
  data: Point[] = [];

  worldMapConfig: any = {};


  constructor () {

    this.pageTitle = [{ label: 'Dashboard', path: '/', }, { label: 'Analytics', path: '/', active: true }];
  }

  ngOnInit(): void {
    // fetch static data
    this._fetchData();

    // initialize all charts
    this.initSubscriberChart();
    this.initViewChart();
    this.initBounceRateChart();
    this.initMediaTrafficChart();
    this.initSessionByBrowserChart();
    this.initMapConfig();

    setInterval(() => {
      this.updateSeries(this.lastDate, { min: 10, max: 90 })
    }, 2000)
  }

  /**
   * fetch data
   */
  _fetchData(): void {
    this.sourceList = SOURCES;
    this.engagementOverviews = ENGAGEMENETOVERVIEW;
    this.platformList = PLATFORMS;
    this.channelList = CHANNELS;
    this.viewDetails = VIEWDETAILS;
  }

  /**
   * initialize overview chart-1 (subscriber chart)
   */
  initSubscriberChart(): void {
    let ts2 = 1484418600000;
    let dates: any[] = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      let innerArr = [ts2, DATESERIES[1][i].value];
      dates.push(innerArr)
    }

    this.subscriberChart = {
      chart: {
        type: 'area',
        stacked: false,
        height: 371,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [3]
      },
      series: [{
        name: 'Subscribers',
        data: dates
      }],
      markers: {
        size: 0,
      },
      colors: ['#5369f8'],
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#f1f3fa'
      },
      fill: {
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 70, 80, 100]
        },
      },
      yaxis: {
        min: 20000000,
        max: 250000000,
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0)
          }
        }
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            toolbar: {
              show: false
            }
          },
          legend: {
            show: false
          },
        }
      }]
    }
  }

  /**
     * initialize overview chart-2 (total view chart)
     */
  initViewChart(): void {
    this.totalViewsChart = {
      chart: {
        height: 371,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      series: [{
        name: 'New',
        type: 'area',
        data: [20, 15, 30, 20, 40, 25, 50, 35, 50, 35, 70]
      }, {
        name: 'Returning',
        type: 'line',
        data: [1, 3, 2, 5, 3, 5, 3, 6, 5.3, 8, 7.3]
      }],
      fill: {
        type: ['gradient', 'solid'],
        opacity: [0.35, 1],
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [45, 100]
        },
      },
      labels: ['Jan 01', 'Jan 02', 'Jan 03', 'Jan 04', 'Jan 05', 'Jan 06', 'Jan 07', 'Jan 08', 'Jan 09 ', 'Jan 10', 'Jan 11'],
      legend: {
        show: false
      },
      colors: ["#5369f8", "#fa5c7c"],
      yaxis: [
        {
          title: {
            // text: 'Series A',
          },
        },
        {
          opposite: true,
          labels: {
            show: false
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;

          }
        }
      },
      grid: {
        borderColor: '#f1f3fa',
        padding: {
          bottom: 5
        }
      },
      responsive: [{
        breakpoint: 600,
        options: {
          yaxis: {
            show: false
          },
          legend: {
            show: false
          }
        }
      }]
    }
  }

  /**
    * initialize overview chart-3 (bounce rate chart)
    */
  initBounceRateChart(): void {
    this.getDayWiseTimeSeries(new Date('11 Feb 2021 GMT').getTime(), 10, { min: 10, max: 90 });
    this.bounceRateChart = {
      chart: {
        height: 371,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 2000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [3],
      },
      colors: ["#56bbd7"],
      series: [{
        name: 'Bounce rate',
        data: [...this.data]
        // data: this.getDayWiseTimeSeries(new Date('11 Feb 2021 GMT').getTime(), 10, { min: 10, max: 90 })
      }],
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: 777600000
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
      grid: {
        borderColor: '#f1f3fa',
      }
    }



  }

  /**
   * initialize social media traffic chart
   */
  initMediaTrafficChart(): void {
    this.mediaTrafficChart = {
      chart: {
        height: 410,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        },

      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Facebook',
        data: [40, 80, 20, 50, 40, 20, 20, 60, 10, 40]
      }, {
        name: 'Instagram',
        data: [0, 0, 0, 15, 0, 0, 5, 10, 0, 0]
      }, {
        name: 'Twitter',
        data: [10, 10, 5, 60, 50, 100, 80, 70, 20, 110]
      }],
      xaxis: {
        categories: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
      },
      colors: ["#5369f8", "#43d39e", "#f3f4f7"],
      fill: {
        opacity: 1
      },
      legend: {
        position: "bottom",
        offsetX: 0,
        offsetY: 0
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#f1f3fa',
        padding: {
          bottom: 5
        }
      }
    }
  }

  /**
   * initialize session by browser
   */
  initSessionByBrowserChart(): void {
    this.browserChart = {
      chart: {
        height: 356,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: -30,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,

            },
            value: {
              show: false,
            }
          }
        }
      },
      colors: ['#5369f8', '#43d39e', '#ff5c75', '#ffbe0b'],
      series: [76, 67, 61, 90],
      labels: ['Safari', 'Firefox', 'Chrome', 'Internet Explorer'],
      legend: {
        show: false,
        floating: true,
        fontSize: '13px',
        position: 'left',
        offsetX: 10,
        offsetY: 10,
        labels: {
          useSeriesColors: true,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
        itemMargin: {
          horizontal: 1,
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }]
    }
  }

  /**
  * initialize map
  */
  initMapConfig(): void {
    this.worldMapConfig = {
      markers: [
        {
          coords: [41.9, 12.45],
          name: 'Vatican City',
        },
        {
          coords: [43.73, 7.41],
          name: 'Monaco',
        },
        {
          coords: [-0.52, 166.93],
          name: 'Nauru',
        },
        {
          coords: [-8.51, 179.21],
          name: 'Tuvalu',
        },
        {
          coords: [43.93, 12.46],
          name: 'San Marino',
        },
        {
          coords: [47.14, 9.52],
          name: 'Liechtenstein',
        },
        {
          coords: [7.11, 171.06],
          name: 'Marshall Islands',
        },
        {
          coords: [17.3, -62.73],
          name: 'Saint Kitts and Nevis',
        },
        {
          coords: [3.2, 73.22],
          name: 'Maldives',
        },
        {
          coords: [35.88, 14.5],
          name: 'Malta',
        },
        {
          coords: [12.05, -61.75],
          name: 'Grenada',
        },
        {
          coords: [13.16, -61.23],
          name: 'Saint Vincent and the Grenadines',
        },
        {
          coords: [13.16, -59.55],
          name: 'Barbados',
        },
        {
          coords: [17.11, -61.85],
          name: 'Antigua and Barbuda',
        },
        {
          coords: [-4.61, 55.45],
          name: 'Seychelles',
        },
        {
          coords: [7.35, 134.46],
          name: 'Palau',
        },
        {
          coords: [42.5, 1.51],
          name: 'Andorra',
        },
        {
          coords: [14.01, -60.98],
          name: 'Saint Lucia',
        },
        {
          coords: [6.91, 158.18],
          name: 'Federated States of Micronesia',
        },
        {
          coords: [1.3, 103.8],
          name: 'Singapore',
        },
        {
          coords: [0.33, 6.73],
          name: 'SÃ£o TomÃ© and PrÃ­ncipe',
        },
      ],
      markerStyle: {
        initial: {
          r: 9,
          fill: '#5369f8',
          'fill-opacity': 0.9,
          stroke: '#fff',
          'stroke-width': 7,
          'stroke-opacity': 0.4,
        },
        hover: {
          fill: '#5369f8',
          stroke: '#fff',
          'fill-opacity': 1,
          'stroke-width': 1.5,
        },
      },
      backgroundColor: 'transparent',
      hoverOpacity: 0.7,
      hoverColor: false,
      regionStyle: {
        initial: {
          fill: '#d4dadd',
        },
      },
    }
  }

  /**
   * updates time series data of bounce rate chart
   */
  updateSeries(baseval: number, yrange: Range): void {
    let chart = { ...this.bounceRateChart };
    var newDate = baseval + 86400000;
    this.lastDate = newDate;
    let array = [...this.data];
    array.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    });
    this.data = array;
    chart.series = [{
      name: 'Bounce rate',
      data: this.data
    }]

    //assign updated options
    this.bounceRateChart = chart;
  }


  /**
   * set daywise time series 
   */
  getDayWiseTimeSeries(baseval: number, count: number, yrange: Range): void {
    let array = [];
    let i = 0;
    while (i < count) {
      let x = baseval;
      let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      array.push({
        x: x, y: y
      });
      this.lastDate = baseval;
      baseval += 86400000;
      i++;
    }
    this.data = array;
  }


}
