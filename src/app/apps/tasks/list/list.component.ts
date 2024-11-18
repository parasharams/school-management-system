import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { TODAYTASKS, UPCOMINGTASKS, OTHERTASKS } from '../shared/data';
import { ListTaskItem } from '../shared/tasks.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  todaysTasks: ListTaskItem[] = [];
  upcomingTasks: ListTaskItem[] = [];
  otherTasks: ListTaskItem[] = [];
  showTodaysTask: boolean = false;
  showUpcomingTask: boolean = false;
  showOtherTask: boolean = false;
  selectedTask!: ListTaskItem;

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Tasks', path: '/' }, { label: 'Tasks List', path: '/', active: true }];
    // get task lists
    this._fetchData();
    // initialize selected task
    this.selectedTask = this.todaysTasks[0];

  }

  /**
   * fetches task data
   */
  _fetchData(): void {
    this.todaysTasks = TODAYTASKS;
    this.upcomingTasks = UPCOMINGTASKS;
    this.otherTasks = OTHERTASKS;
  }
}
