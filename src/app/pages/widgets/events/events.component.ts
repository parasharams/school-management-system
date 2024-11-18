import { Component, Input, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { EventSchedule } from './events.model';

@Component({
  selector: 'app-widget-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  @Input() cardTitle?: string = '';
  @Input() events: EventSchedule[] = [];
  model!: NgbDateStruct;

  constructor (private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.model = this.calendar.getToday();
  }

}
