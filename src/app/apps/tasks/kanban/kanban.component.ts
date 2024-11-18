import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortableOptions } from 'sortablejs';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { KANBANTASKS } from '../shared/data';
import { KanbanBoardTaskItem } from '../shared/tasks.model';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];

  todoTasks!: KanbanBoardTaskItem[];
  inprogressTasks!: KanbanBoardTaskItem[];
  reviewTasks!: KanbanBoardTaskItem[];
  doneTasks!: KanbanBoardTaskItem[];
  options: SortableOptions = {};
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  newTask!: FormGroup;

  dueDate!: NgbDateStruct;
  assignee_avatar: string = 'assets/images/users/avatar-2.jpg';
  formSubmitted: boolean = false;


  @ViewChild('content', { static: true }) content: any;


  constructor (public activeModal: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.pageTitle = [{ label: 'Tasks', path: '/' }, { label: 'Kanban Board', path: '/', active: true }];
    this.dueDate = { day: 10, month: 5, year: 2022 }

    this.newTask = this.fb.group({
      title: ['', Validators.required],
      dueDate: [this.dueDate],
      priority: ['High', Validators.required],
      description: [''],
      status: ['todo'],

    });

    this.options = {
      group: 'kanban-tasks'
    }
    // get task list
    this._fetchData();
  }

  /**
   * fetches task list
   */
  _fetchData(): void {
    this.todoTasks = KANBANTASKS.filter(t => t.status === 'Pending');
    this.inprogressTasks = KANBANTASKS.filter(t => t.status === 'Inprogress');
    this.reviewTasks = KANBANTASKS.filter(t => t.status === 'Review');
    this.doneTasks = KANBANTASKS.filter(t => t.status === 'Done');
  }


  openModal(): void {
    this.activeModal.open(this.content, { size: 'lg', centered: true });
  }

  /**
  * convenience getter for easy access to form fields
  */
  get formValues() { return this.newTask?.controls; }

  /**
   * saves new task
   */
  saveTask() {
    let updatedTasks = [...this.todoTasks];

    this.formSubmitted = true;
    if (this.newTask?.valid) {
      updatedTasks.push({
        id: KANBANTASKS.length,
        title: this.formValues?.title.value,
        priority: this.formValues?.priority.value,
        userAvatar: this.assignee_avatar,
        status: this.formValues?.status.value,
        totalComments: 10,
        totalSubTasks: 4,
        subTaskCompleted: 3,
        dueDate: this.months[this.dueDate.month - 1] + " " + this.dueDate.day + " , " + this.dueDate.year
      });
      this.todoTasks = updatedTasks;

      this.activeModal.dismissAll();
    }
  }

}
