import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ApexChartOptions } from './charts.model';
import {
  lineChartWithData, gradientLineChartData, stackedAreaChartData, barWithNegativeData, basicBarChartData, bubbleChartData, basicColumnChartData, columnChartData, mixedChart1Data, mixedChart2Data,
  multiYaxisChartData, threeDBubbleChartData, scatterChartData, scatterDateTimeChartData, pieChartData, patternedDonutChartData, gaugeChartData, gradientDonutChartData, radialChartData, multiRadialChartData
} from './data';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  lineChartWithData: Partial<ApexChartOptions> = {};
  gradientLineChart: Partial<ApexChartOptions> = {};
  stackedAreaChart: Partial<ApexChartOptions> = {};
  basicColumnChart: Partial<ApexChartOptions> = {};
  columnChartWithData: Partial<ApexChartOptions> = {};
  mixedChart1: Partial<ApexChartOptions> = {};
  basicBarChart: Partial<ApexChartOptions> = {};
  barWithNegativeData: Partial<ApexChartOptions> = {};
  mixedChart2: Partial<ApexChartOptions> = {};
  multiYaxisChart: Partial<ApexChartOptions> = {};
  bubbleChart: Partial<ApexChartOptions> = {};
  threeDBubbleChart: Partial<ApexChartOptions> = {};
  scatterChart: Partial<ApexChartOptions> = {};
  scatterDateTimeChart: Partial<ApexChartOptions> = {};
  pieChart: Partial<ApexChartOptions> = {};
  gradientDonutChart: Partial<ApexChartOptions> = {};
  patternedDonutChart: Partial<ApexChartOptions> = {};
  radialChart: Partial<ApexChartOptions> = {};
  multiRadialChart: Partial<ApexChartOptions> = {};
  gaugeChart: Partial<ApexChartOptions> = {};


  chartsInitialized:boolean=false;

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Components', path: '/', }, { label: 'Charts', path: '/', active: true }];
    this.initChart();
    setTimeout(() => {
      this.chartsInitialized=true;
    }, 500);
  }

  ngAfterViewInit(): void {
    // global configuration
    (window as any)['Apex'] = {
      chart: {
        parentHeightOffset: 0,
        toolbar: {
          show: false
        }
      },
      grid: {
        padding: {
          left: 20,
          right: 0
        }
      },
      colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
      tooltip: {
        theme: 'dark',
        x: { show: false }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        axisBorder: {
          color: '#d6ddea',
        },
        axisTicks: {
          color: '#d6ddea',
        }
      },
      yaxis: {
        labels: {
          offsetX: -5,
        }
      }
    };
  }

  ngOnDestroy(): void {
    (window as any)['Apex'] = {};
  }

  /**
   * initialize charts
   */
  initChart(): void {
    this.lineChartWithData = {
      chart: {
        height: 380,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: [3, 3],
        curve: 'smooth'
      },
      series: [{
        name: "High - 2018",
        data: lineChartWithData.data1 || []
      },
      {
        name: "Low - 2018",
        data: lineChartWithData.data2 || []
      }
      ],
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#e9ecef'
      },
      markers: {
        // style: 'inverted',
        size: 6
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        },
        axisBorder: {
          color: '#d6ddea',
        },
        axisTicks: {
          color: '#d6ddea',
        }
      },
      yaxis: {
        title: {
          text: 'Temperature'
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
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

    };

    this.gradientLineChart = {
      chart: {
        height: 380,
        type: 'line',
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      series: [{
        name: 'Likes',
        data: gradientLineChartData.data || []
      }],
      xaxis: {
        type: 'datetime',
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
      },
      title: {
        text: 'Social Media',
        align: 'left',
        style: {
          fontSize: "14px",
          color: '#666'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#43d39e'],
          shadeIntensity: 1,
          type: 'vertical',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        },
      },
      markers: {
        size: 4,
        colors: ["#50a5f1"],
        strokeWidth: 2,
        hover: {
          size: 7,
        }

      },
      yaxis: {
        min: -10,
        max: 40,
        title: {
          text: 'Engagement',
        },
      },

      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#185a9d'
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
    };

    this.stackedAreaChart = {
      chart: {
        height: 380,
        type: 'area',
        stacked: true
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [3, 3, 3],
        curve: 'smooth'
      },
      series: [{
        name: 'South',
        data: stackedAreaChartData.data1 || []
      },
      {
        name: 'North',
        data: stackedAreaChartData.data2 || []
      },
      {
        name: 'Central',
        data: stackedAreaChartData.data3 || []
      }
      ],
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
    };


    this.basicColumnChart = {
      chart: {
        height: 380,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          // endingShape: 'rounded',
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: [{
        name: 'Net Profit',
        data: basicColumnChartData.data1 || []
      }, {
        name: 'Revenue',
        data: basicColumnChartData.data2 || []
      }, {
        name: 'Free Cash Flow',
        data: basicColumnChartData.data3 || []
      }],
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      legend: {
        offsetY: 7,
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#f1f3fa'
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    }
      ;

    this.columnChartWithData = {
      chart: {
        height: 380,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -30,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      series: [{
        name: 'Inflation',
        data: columnChartData.data || []
      }],
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'top',
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35,

        }
      },
      fill: {
        gradient: {
          shade: 'light',
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        },
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }

      },
      title: {
        text: 'Monthly Inflation in Argentina, 2002',
        floating: true,
        offsetY: 350,
        align: 'center',
        style: {
          color: '#444'
        }
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#f1f3fa'
      }
    };

    this.mixedChart1 = {
      chart: {
        height: 380,
        type: 'line',
      },
      stroke: {
        width: 3,
        curve: 'smooth'
      },

      series: [{
        name: 'Team A',
        type: 'area',
        data: mixedChart1Data.data1 || []
      }, {
        name: 'Team B',
        type: 'line',
        data: mixedChart1Data.data2 || []
      }],
      fill: {
        type: 'solid',
        opacity: [0.35, 1],
      },
      labels: ['Dec 01', 'Dec 02', 'Dec 03', 'Dec 04', 'Dec 05', 'Dec 06', 'Dec 07', 'Dec 08', 'Dec 09 ', 'Dec 10', 'Dec 11'],
      markers: {
        size: 0
      },
      legend: {
        offsetY: 7,
      },
      yaxis: [{
        title: {
          text: 'Series A',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Series B',
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
      }

    };

    this.basicBarChart = {
      chart: {
        height: 380,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        data: basicBarChartData.data || []
      }],
      xaxis: {
        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
      }
    };


    this.barWithNegativeData = {
      chart: {
        height: 380,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%',

        },
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Males',
        data: barWithNegativeData.data1 || []
      },
      {
        name: 'Females',
        data: barWithNegativeData.data2 || []
      }
      ],
      grid: {

        borderColor: '#f1f3fa'
      },
      yaxis: {
        min: -5,
        max: 5,
        title: {
          // text: 'Age',
        },
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val: any) {
            return val
          }
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%"
          }
        }
      },
      xaxis: {
        categories: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49', '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9', '0-4'],
        title: {
          text: 'Percent'
        },
        labels: {
          formatter: function (val: any) {
            return Math.abs(Math.round(val)) + "%"
          }
        }
      },
      legend: {
        offsetY: 7,
      }
    };

    this.mixedChart2 = {
      chart: {
        height: 380,
        type: 'line',
        stacked: false,
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: [0, 2, 4],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      series: [{
        name: 'Team A',
        type: 'column',
        data: mixedChart2Data.data1 || []
      }, {
        name: 'Team B',
        type: 'area',
        data: mixedChart2Data.data2 || []
      }, {
        name: 'Team C',
        type: 'line',
        data: mixedChart2Data.data3
      }],
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003', '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'],
      markers: {
        size: 0
      },
      legend: {
        offsetY: 7,
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Points',
        },
      },
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
          right: 0,
          left: 0
        }
      }
    };

    this.multiYaxisChart = {
      chart: {
        height: 380,
        type: 'line',
        stacked: false,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [0, 0, 3]
      },
      series: [{
        name: 'Income',
        type: 'column',
        data: multiYaxisChartData.data1 || []
      }, {
        name: 'Cashflow',
        type: 'column',
        data: multiYaxisChartData.data2 || []
      }, {
        name: 'Revenue',
        type: 'line',
        data: multiYaxisChartData.data3 || []
      }],
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: [{
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#675db7'
        },
        labels: {
          style: {
            colors: '#675db7',
          }
        },
        title: {
          text: "Income (thousand crores)"
        },
      },

      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#23b397'
        },
        labels: {
          style: {
            colors: '#23b397',
          },
          offsetX: 10
        },
        title: {
          text: "Operating Cashflow (thousand crores)",
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#e36498'
        },
        labels: {
          style: {
            colors: '#e36498',
          }
        },
        title: {
          text: "Revenue (thousand crores)"
        }
      },

      ],
      tooltip: {
        followCursor: true,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y + " thousand crores"
            }
            return y;
          }
        }
      },
      grid: {
        borderColor: '#f1f3fa'
      },
      legend: {
        offsetY: 7,
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
    };

    this.bubbleChart = {
      chart: {
        height: 380,
        type: 'bubble',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Bubble 1',
        data: bubbleChartData.data1 || []
      },
      {
        name: 'Bubble 2',
        data: bubbleChartData.data2 || []
      },
      {
        name: 'Bubble 3',
        data: bubbleChartData.data3 || []
      }
      ],
      fill: {
        opacity: 0.8,
      },
      xaxis: {
        tickAmount: 12,
        type: 'category',
      },
      yaxis: {
        max: 70
      },
      grid: {
        borderColor: '#f1f3fa'
      },
      legend: {
        offsetY: 7,
      }
    };

    this.threeDBubbleChart = {
      chart: {
        height: 380,
        type: 'bubble',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Product 1',
        data: threeDBubbleChartData.data1 || []
      },
      {
        name: 'Product 2',
        data: threeDBubbleChartData.data2 || []
      },
      {
        name: 'Product 3',
        data: threeDBubbleChartData.data3 || []
      },
      {
        name: 'Product 4',
        data: threeDBubbleChartData.data4 || []
      }
      ],
      fill: {
        type: 'gradient',
      },
      xaxis: {
        tickAmount: 12,
        type: 'datetime',

        labels: {
          rotate: 0,
        }
      },
      yaxis: {
        max: 70
      },
      legend: {
        offsetY: 7,
      },
      grid: {
        borderColor: '#f1f3fa'
      }
    };

    this.scatterChart = {
      chart: {
        height: 380,
        type: 'scatter',
        zoom: {
          enabled: false
        }
      },
      series: [{
        name: "Sample A",
        data: scatterChartData.data1 || []
      }, {
        name: "Sample B",
        data: scatterChartData.data2 || []
      }, {
        name: "Sample C",
        data: scatterChartData.data3 || []
      }],
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1)
          }
        }
      },
      yaxis: {
        tickAmount: 7
      },
      grid: {
        borderColor: '#f1f3fa'
      },
      legend: {
        offsetY: 7,
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
    };

    this.scatterDateTimeChart = {
      chart: {
        height: 380,
        type: 'scatter',
        zoom: {
          type: 'xy'
        }
      },
      series: [{
        name: 'Team 1',
        data: scatterDateTimeChartData.data1 || []
      },
      {
        name: 'Team 2',
        data: scatterDateTimeChartData.data2 || []
      },
      {
        name: 'Team 3',
        data: scatterDateTimeChartData.data3 || []
      },
      {
        name: 'Team 4',
        data: scatterDateTimeChartData.data4 || []
      },
      {
        name: 'Team 5',
        data: scatterDateTimeChartData.data5 || []
      }],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: '#f1f3fa',
      },
      legend: {
        offsetY: 7,
      },
      xaxis: {
        type: 'datetime',

      },
      yaxis: {
        max: 70
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
    };

    this.pieChart = {
      chart: {
        height: 320,
        type: 'pie',
      },
      series: pieChartData.data || [],
      labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        // verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 7
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            height: 240
          },
          legend: {
            show: false
          },
        }
      }]

    };

    this.gradientDonutChart = {
      chart: {
        height: 320,
        type: 'donut',
      },
      series: gradientDonutChartData.data || [],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        // verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 7
      },
      labels: ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"],
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            height: 240
          },
          legend: {
            show: false
          },
        }
      }],
      fill: {
        type: 'gradient'
      }
    };

    this.patternedDonutChart = {
      chart: {
        height: 320,
        type: 'donut',
        dropShadow: {
          enabled: true,
          color: '#111',
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        show: true,
        width: 2,
      },
      series: patternedDonutChartData.data || [],
      labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8
        }
      },
      fill: {
        type: 'pattern',
        opacity: 1,
        pattern: {
          style: ['verticalLines', 'squares', 'horizontalLines', 'circles', 'slantedLines'],
        },
      },
      states: {
        hover: {
          filter: {
            type: 'none'
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        // verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: 7
      },
      responsive: [{
        breakpoint: 600,
        options: {
          chart: {
            height: 240
          },
          legend: {
            show: false
          },
        }
      }]
    };

    this.radialChart = {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          }
        },
      },
      colors: ["#50a5f1"],
      series: radialChartData.data || [],
      labels: ['CRICKET'],

    };

    this.multiRadialChart = {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w: string): string {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return '249'
              }
            }
          }
        }
      },
      series: multiRadialChartData.data || [],
      labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
    };

    this.gaugeChart = {
      chart: {
        height: 350,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: '16px',
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: '22px',
              color: undefined,
              formatter: function (val) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        gradient: {
          // enabled: true,
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: 4
      },
      colors: ["#f46a6a"],
      series: gaugeChartData.data || [],
      labels: ['Median Ratio'],
      responsive: [{
        breakpoint: 380,
        options: {
          chart: {
            height: 280
          }
        }
      }]
    };
  }


}
