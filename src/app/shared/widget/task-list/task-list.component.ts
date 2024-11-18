import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from './task-list.model';

@Component({
  selector: 'app-widget-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() taskList: TaskItem[] = [];
  @Input() cardTitle?: string = 'Tasks';

  constructor () { }

  ngOnInit(): void {
  }

}
