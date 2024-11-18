import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ChartStatistics } from 'src/app/shared/widget/chart-statistics-widget/chart-statistics.model';
import { ChatMessage } from 'src/app/shared/widget/chat/chat.model';
import { CHATMESSAGES } from 'src/app/shared/widget/chat/data';
import { Member } from 'src/app/shared/widget/members/members.model';
import { OverviewItem } from 'src/app/shared/widget/overview/overview.model';
import { TaskItem } from 'src/app/shared/widget/task-list/task-list.model';
import { ApexChartOptions } from '../../charts/charts.model';
import { CHARTSTATISTICSDATA, MEMBERS, OVERVIEWITEMS, RECENTORDERS, TASKLIST } from './data';
import { OrderItem } from './ecommerce.model';

@Component({
  selector: 'app-dashboard-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit {

  selectedDateRange: string = '';
  hoveredDate: NgbDate | null = null;
  fromDate!: NgbDate;
  toDate: NgbDate | null = null;

  chartStatisticsData: ChartStatistics[] = [];
  overviewData: OverviewItem[] = [];
  revenueChart: Partial<ApexChartOptions> = {};
  targetChart: Partial<ApexChartOptions> = {};
  categoryChart: Partial<ApexChartOptions> = {};
  recentOrderData: OrderItem[] = [];
  memberList: Member[] = [];
  taskList: TaskItem[] = [];
  chatMessages: ChatMessage[] = [];

  constructor (private calendar: NgbCalendar, private titleService: Title) {
    titleService.setTitle("Dashboard | Shreyu - Responsive Angular and Bootstrap 5 Admin Dashboard Template");
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.selectedDateRange = this.fromDate.year + '-' + ('0' + this.fromDate.month).slice(-2) + '-' + ('0' + this.fromDate.day).slice(-2) + ' to ' + this.toDate.year + '-' + ('0' + this.toDate.month).slice(-2) + '-' + ('0' + this.toDate.day).slice(-2)
  }

  ngOnInit(): void {
    this._fetchData();
    this.initChart();
  }

  /**
 * selects date range
 * @param date date
 */
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.selectedDateRange = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.selectedDateRange = this.fromDate.year + '-' + ('0' + this.fromDate.month).slice(-2) + '-' + ('0' + this.fromDate.day).slice(-2) + ' to ' + this.toDate.year + '-' + ('0' + this.toDate.month).slice(-2) + '-' + ('0' + this.toDate.day).slice(-2)
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.selectedDateRange = "";
    }
  }

  /**
   * returns true/false based on whether date is hovered or not
   * @param date date
   */
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  /**
   * returns true if date is inside selected range
   * @param date date
   */
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  /**
   * returns true if date is in range
   * @param date date
   */
  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  /**
   * fetch data
   */
  _fetchData(): void {
    this.chartStatisticsData = CHARTSTATISTICSDATA;
    this.overviewData = OVERVIEWITEMS;
    this.recentOrderData = RECENTORDERS;
    this.memberList = MEMBERS;
    this.taskList = TASKLIST;
    this.chatMessages = CHATMESSAGES;
  }

  /**
   * initialize chart 
   */
  initChart(): void {
    // revenue chart config
    this.revenueChart = {
      chart: {
        height: 338,
        type: 'area',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      series: [{
        name: 'Revenue',
        data: [10, 20, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50, 35]
      }],

      legend: {
        show: false
      },
      colors: ['#43d39e'],
      xaxis: {
        type: 'category',
        categories: this.getDaysInMonth(new Date().getMonth(), new Date().getFullYear()),
        tooltip: {
          enabled: false
        },
        axisBorder: {
          show: false
        },
        labels: {

        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + "k"
          }
        }
      },
      tooltip: {
        x: {
          show: false
        },
        theme: 'dark'
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
      },
    }

    // target chart config
    this.targetChart = {
      chart: {
        height: 349,
        type: 'bar',
        stacked: true,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
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
        data: [35, 44, 55, 57, 56, 61]
      }, {
        name: 'Revenue',
        data: [52, 76, 85, 101, 98, 87]
      }],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        axisBorder: {
          show: false
        },
      },
      legend: {
        show: false
      },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.2
        },
        borderColor: '#f3f4f7'
      },
      tooltip: {
        x: {
          show: false
        },
        theme: 'dark',
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    }

    // sales by category chart config
    this.categoryChart = {
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
          expandOnClick: false
        }
      },
      chart: {
        height: 291,
        type: 'donut',
      },
      legend: {
        show: true,
        position: 'right',
        horizontalAlign: 'left',
        itemMargin: {
          horizontal: 6,
          vertical: 3
        }
      },
      series: [44, 55, 41, 17],
      labels: ['Clothes 44k', 'Smartphons 55k', 'Electronics 41k', 'Other 17k'],
      responsive: [{
        breakpoint: 480,
        options: {

          legend: {
            position: 'bottom'
          }
        }
      }],
      tooltip: {
        y: {
          formatter: function (value) { return value + "k" }
        },
      }
    }
  }

  /**
   * @param month month
   * @param year year
   * @returns days list
   */
  getDaysInMonth(month: number, year: number): string[] {
    let date: Date = new Date(year, month, 1);
    let days: string[] = [];
    let idx: number = 0;
    while (date.getMonth() === month && idx < 15) {
      var d = new Date(date);
      days.push(d.getDate() + " " + d.toLocaleString('en-us', { month: 'short' }));
      date.setDate(date.getDate() + 1);
      idx += 1;
    }
    return days;
  }


}
