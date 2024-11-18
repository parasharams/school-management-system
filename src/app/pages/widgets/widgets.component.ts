import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { Activity } from 'src/app/pages/widgets/activity/activity.model';
import { ChartStatistics } from 'src/app/shared/widget/chart-statistics-widget/chart-statistics.model';
import { ChatMessage } from 'src/app/shared/widget/chat/chat.model';
import { CHATMESSAGES } from 'src/app/shared/widget/chat/data';
import { Member } from 'src/app/shared/widget/members/members.model';
import { OverviewItem } from 'src/app/shared/widget/overview/overview.model';
import { TaskItem } from 'src/app/shared/widget/task-list/task-list.model';
import { CHARTSTATISTICSDATA, MEMBERS, TASKLIST } from '../dashboard/ecommerce/data';
import { ACTIVITIES, CALENDAREVENTS, CHARTDATA, OVERVIEWITEMS, STATISTICSWIDGETDATA1, STATISTICSWIDGETDATA2, USERPROFILE1, USERPROFILE2, USERPROFILE3, USERPROFILE4, USERPROFILE5 } from './data';
import { StatisticsWidget1 } from './statistics-widget-one/statistics-widget-one.model';
import { StatisticsWidget2 } from './statistics-widget-two/statistics-widget-two.model';
import { ChartWidget } from './chart-widget/chart-widget.model';
import { UserProfile } from './user-profile/shared/user-profile.model';
import { EventSchedule } from './events/events.model';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];

  statisticsWidgets1: StatisticsWidget1[] = [];
  statisticsWidgets2: StatisticsWidget2[] = [];

  chartStatisticsWidgets: ChartStatistics[] = [];
  chartWidgets: ChartWidget[] = [];

  // user profile cards
  user1!: UserProfile;
  user2!: UserProfile;
  user3!: UserProfile;
  user4!: UserProfile;
  user5!: UserProfile;

  // team
  teamMembers: Member[] = [];
  chatMessages: ChatMessage[] = [];
  events: EventSchedule[] = [];
  overViewItems: OverviewItem[] = [];
  taskList: TaskItem[] = [];
  activities: Activity[] = [];


  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Components', path: '/', }, { label: 'Widgets', path: '/', active: true }];
    this._fetchData();
  }

  /**
   * fetch widget data
   */
  _fetchData(): void {

    this.statisticsWidgets1 = STATISTICSWIDGETDATA1;
    this.statisticsWidgets2 = STATISTICSWIDGETDATA2;
    this.chartStatisticsWidgets = CHARTSTATISTICSDATA;
    this.chartWidgets = CHARTDATA;
    // user
    this.user1 = USERPROFILE1;
    this.user2 = USERPROFILE2;
    this.user3 = USERPROFILE3;
    this.user4 = USERPROFILE4;
    this.user5 = USERPROFILE5;
    // team
    this.teamMembers = MEMBERS;
    this.chatMessages = CHATMESSAGES;
    this.events = CALENDAREVENTS;
    this.overViewItems = OVERVIEWITEMS;
    this.taskList = TASKLIST;
    this.activities = ACTIVITIES;
  }

}
