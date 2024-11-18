import { Component, Input, OnInit } from '@angular/core';
import { ListTaskItem } from 'src/app/apps/tasks/shared/tasks.model';

@Component({
  selector: 'app-profile-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() taskList: ListTaskItem[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
