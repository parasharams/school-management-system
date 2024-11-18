import { Component, Input, OnInit } from '@angular/core';
import { ListTaskItem } from '../../shared/tasks.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() selectedTask: ListTaskItem = {};
  newComment: string = '';

  constructor () { }

  ngOnInit(): void {
  }

}
